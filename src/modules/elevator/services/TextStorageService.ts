export interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

class TextStorageService {
  private storedText: string;
  private history: Message[];

  constructor() {
    this.storedText = '';
    this.history = [];
  }

  public storeText(text: string): void {
    this.storedText = text;
    this.history = []; // Reseta o histórico ao receber um novo texto base
  }

  public getText(): string {
    return this.storedText;
  }

  public getHistory(): Message[] {
    return this.history;
  }

  public addMessageToHistory(role: 'user' | 'model', text: string): void {
    this.history.push({
      role,
      parts: [{ text }],
    });
  }
}

export const textStorageService = new TextStorageService();
