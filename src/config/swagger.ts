export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Elevator AI API',
    version: '1.0.0',
    description: 'API para responder perguntas sobre normas de elevadores usando IA',
  },
  servers: [
    {
      url: '/api',
      description: 'API Principal',
    },
  ],
  paths: {
    '/upload-text': {
      post: {
        summary: 'Armazena o texto base',
        description: 'Recebe um texto grande e armazena em memória para ser usado como contexto pela IA.',
        tags: ['Elevator'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  text: {
                    type: 'string',
                    description: 'O texto base sobre as normas do elevador.',
                  },
                },
                required: ['text'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Texto armazenado com sucesso.',
          },
          '400': {
            description: 'Erro de validação.',
          },
        },
      },
    },
    '/ask': {
      post: {
        summary: 'Faz uma pergunta à IA',
        description: 'Envia uma pergunta para a IA, que responderá exclusivamente com base no texto armazenado.',
        tags: ['Elevator'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  question: {
                    type: 'string',
                    description: 'A pergunta a ser feita.',
                  },
                },
                required: ['question'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Resposta da IA.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    answer: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Erro de validação ou texto não fornecido.',
          },
          '500': {
            description: 'Erro interno.',
          },
        },
      },
    },
  },
};
