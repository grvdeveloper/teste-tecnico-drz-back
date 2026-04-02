import { app } from './app';

// NOTA: O ambiente do AI Studio restringe a porta externa para 3000.
// Embora a especificação peça a porta 5000, para que a aplicação funcione
// e seja acessível neste ambiente, a porta 3000 deve ser utilizada.
// Se você for rodar localmente fora deste ambiente, pode alterar para 5000.
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
