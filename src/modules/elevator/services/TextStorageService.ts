class TextStorageService {
  private storedText: string;

  constructor() {
    // Área reservada para o texto padrão (pode ser substituído via API)
    this.storedText = `
[ÁREA RESERVADA PARA O TEXTO PADRÃO]
Insira aqui as Normas Operacionais de um Elevador Manual de Carga dos Anos 1970.
    `.trim();
  }

  public storeText(text: string): void {
    this.storedText = text;
  }

  public getText(): string {
    return this.storedText;
  }
}

export const textStorageService = new TextStorageService();
