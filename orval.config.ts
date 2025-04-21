module.exports = {
  petstore: {
    output: {
      mode: 'single', // Gera um único arquivo
      target: 'src/api/generated.ts', // Caminho onde o cliente será gerado
      schemas: 'src/api/model', // Caminho para os modelos (opcional)
      client: 'react-query', // Usa React Query como cliente (ou 'axios' se preferir)
      override: {
        mutator: {
          path: './src/api/index.ts', // Arquivo personalizado para o cliente HTTP (opcional)
        },
      },
    },
    input: {
      target: 'http://localhost:3333/docs/json', // URL do seu schema Swagger
    },
  },
  petstoreZod: {
    input: {
      target: 'http://localhost:3333/docs/json',
    },
    output: { 
      mode: 'tags-split',
      client: 'zod',
      target: 'src/schema',
      fileExtension: '.zod.ts',
    },
  },
};