import { initialSchoolInfo, initialPrincipalMessage, initialTeachers, initialStudents, initialRoutines, initialExams, initialResults, initialNotices, initialGallery } from '../data/initialData';
import { Teacher, Student, RoutinePeriod, Examination, StudentResult, Notice, SchoolInfo, PrincipalMessage, GalleryItem } from '../types';
import { isSupabaseConfigured, supabase } from '../supabase/client';

type Listener = () => void;

const DEFAULTS = {
  school_info: initialSchoolInfo,
  principal_message: initialPrincipalMessage,
  teachers: initialTeachers,
  students: initialStudents,
  routines: initialRoutines,
  exams: initialExams,
  results: initialResults,
  notices: initialNotices,
  gallery: initialGallery,
};

class DatabaseService {
  private listeners = new Set<Listener>();

  private localKey(key: string) {
    return `mghs_${key}`;
  }

  private localGet<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(this.localKey(key));
      if (raw) return JSON.parse(raw) as T;
    } catch (error) {
      console.warn(`Local storage read failed for ${key}`, error);
    }
    this.localSet(key, fallback);
    return fallback;
  }

  private localSet<T>(key: string, value: T) {
    try {
      localStorage.setItem(this.localKey(key), JSON.stringify(value));
      this.notifyListeners();
    } catch (error) {
      console.error(`Local storage write failed for ${key}`, error);
    }
  }

  private async remoteGet<T>(key: string): Promise<T | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('app_data')
      .select('value')
      .eq('key', key)
      .maybeSingle();
    if (error) throw error;
    return (data?.value as T) ?? null;
  }

  private async remoteSet<T>(key: string, value: T) {
    if (!supabase) return;
    const { error } = await supabase
      .from('app_data')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    if (error) throw error;
  }

  private async get<T>(key: keyof typeof DEFAULTS, fallback: T): Promise<T> {
    if (isSupabaseConfigured && supabase) {
      try {
        const remote = await this.remoteGet<T>(key);
        if (remote !== null) {
          this.localSet(key, remote);
          return remote;
        }
      } catch (error) {
        console.warn(`Supabase read failed for ${key}; using local fallback.`, error);
      }
    }
    return this.localGet<T>(key, fallback);
  }

  private async set<T>(key: keyof typeof DEFAULTS, value: T) {
    this.localSet(key, value);
    if (isSupabaseConfigured && supabase) {
      try {
        await this.remoteSet(key, value);
      } catch (error) {
        console.error(`Supabase save failed for ${key}:`, error);
        throw error;
      }
    }
  }

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try { listener(); } catch (error) { console.error(error); }
    });
  }

  async getSchoolInfo() { return this.get<SchoolInfo>('school_info', initialSchoolInfo); }
  async updateSchoolInfo(info: SchoolInfo) { await this.set('school_info', info); }

  async getPrincipalMessage() { return this.get<PrincipalMessage>('principal_message', initialPrincipalMessage); }
  async updatePrincipalMessage(value: PrincipalMessage) { await this.set('principal_message', value); }

  async getTeachers() {
    const list = await this.get<Teacher[]>('teachers', initialTeachers);
    return [...list].sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  async saveTeacher(item: Teacher) {
    const list = await this.getTeachers();
    const updated = list.some(x => x.id === item.id) ? list.map(x => x.id === item.id ? item : x) : [item, ...list];
    await this.set('teachers', updated);
  }
  async deleteTeacher(id: string) { await this.set('teachers', (await this.getTeachers()).filter(x => x.id !== id)); }

  async getStudents() {
    const list = await this.get<Student[]>('students', initialStudents);
    return [...list].sort((a, b) => a.roll - b.roll);
  }
  async saveStudent(item: Student) {
    const list = await this.getStudents();
    const updated = list.some(x => x.id === item.id) ? list.map(x => x.id === item.id ? item : x) : [item, ...list];
    await this.set('students', updated);
  }
  async deleteStudent(id: string) { await this.set('students', (await this.getStudents()).filter(x => x.id !== id)); }

  async getRoutines() { return this.get<RoutinePeriod[]>('routines', initialRoutines); }
  async saveRoutine(item: RoutinePeriod) {
    const list = await this.getRoutines();
    await this.set('routines', list.some(x => x.id === item.id) ? list.map(x => x.id === item.id ? item : x) : [...list, item]);
  }
  async deleteRoutine(id: string) { await this.set('routines', (await this.getRoutines()).filter(x => x.id !== id)); }

  async getExams() { return this.get<Examination[]>('exams', initialExams); }
  async saveExam(item: Examination) {
    const list = await this.getExams();
    await this.set('exams', list.some(x => x.id === item.id) ? list.map(x => x.id === item.id ? item : x) : [item, ...list]);
  }
  async deleteExam(id: string) { await this.set('exams', (await this.getExams()).filter(x => x.id !== id)); }

  async getResults(onlyPublished = false) {
    const list = await this.get<StudentResult[]>('results', initialResults);
    return onlyPublished ? list.filter(x => x.isPublished) : list;
  }
  async saveResult(item: StudentResult) {
    const list = await this.getResults(false);
    await this.set('results', list.some(x => x.id === item.id) ? list.map(x => x.id === item.id ? item : x) : [item, ...list]);
  }
  async togglePublishResult(id: string, isPublished: boolean) {
    const list = await this.getResults(false);
    await this.set('results', list.map(x => x.id === id ? { ...x, isPublished, publishedAt: isPublished ? new Date().toISOString().split('T')[0] : undefined } : x));
  }
  async deleteResult(id: string) { await this.set('results', (await this.getResults(false)).filter(x => x.id !== id)); }

  async getNotices() { return this.get<Notice[]>('notices', initialNotices); }
  async saveNotice(item: Notice) {
    const list = await this.getNotices();
    await this.set('notices', list.some(x => x.id === item.id) ? list.map(x => x.id === item.id ? item : x) : [item, ...list]);
  }
  async deleteNotice(id: string) { await this.set('notices', (await this.getNotices()).filter(x => x.id !== id)); }

  async getGallery() { return this.get<GalleryItem[]>('gallery', initialGallery); }
  async saveGalleryItem(item: GalleryItem) {
    const list = await this.getGallery();
    await this.set('gallery', list.some(x => x.id === item.id) ? list.map(x => x.id === item.id ? item : x) : [item, ...list]);
  }
  async deleteGalleryItem(id: string) { await this.set('gallery', (await this.getGallery()).filter(x => x.id !== id)); }

  async resetToDefaults() {
    for (const [key, value] of Object.entries(DEFAULTS)) {
      await this.set(key as keyof typeof DEFAULTS, value);
    }
  }

  get isUsingSupabase() { return isSupabaseConfigured; }
  get isUsingFirestore() { return false; }

  async saveSchoolInfo(info: SchoolInfo) { await this.updateSchoolInfo(info); }
  async savePrincipalMessage(value: PrincipalMessage) { await this.updatePrincipalMessage(value); }
}

export const dbService = new DatabaseService();
