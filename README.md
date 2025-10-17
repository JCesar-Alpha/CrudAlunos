# Prática 06 - Sistema CRUD de alunos

## 🎯 Objetivo
Desenvolver uma aplicação web completa que implementa operações CRUD (Create, Read, Update, Delete) para gerenciamento de alunos, utilizando uma API REST externa. A aplicação deve demonstrar o consumo de APIs, manipulação do DOM e tratamento de requisições assíncronas.

## 📋 Requisitos Implementados

### Funcionalidades CRUD
- ✅ **CREATE**: Cadastrar novos alunos
- ✅ **READ**: Listar todos os alunos
- ✅ **UPDATE**: Editar alunos existentes
- ✅ **DELETE**: Excluir alunos

### Estrutura de Dados
Cada aluno possui os seguintes campos:
```json
{
  "id": 0,
  "matricula": "string",
  "nome": "string",
  "turma": "string",
  "curso": "string",
}
```

### Interface do Usuário
- Formulário para cadastro/edição de alunos
- Tabela para exibição dos alunos
- Botões de ação (Editar/Excluir)
- Mensagens de feedback para o usuário
- Indicador de carregamento (loading)

## 🔗 API Utilizada
**Base URL**: `https://proweb.leoproti.com.br/alunos`

### Endpoints Disponíveis

#### GET /alunos
- **Descrição**: Retorna todos os alunos
- **Método**: GET
- **Response**: Array de alunos

#### POST /alunos
- **Descrição**: Cadastra um aluno
- **Método**: POST
- **Body**:
```json
{
  "matricula": "string",
  "nome": "string",
  "turma": "string",
  "curso": "string",
}
```

#### GET /alunos/{id}
- **Descrição**: Retorna um aluno específico
- **Método**: GET
- **Parâmetro**: id do aluno

#### PUT /alunos/{id}
- **Descrição**: Atualiza um aluno existente
- **Método**: PUT
- **Parâmetro**: id do aluno
- **Body**:
```json
{
  "id": 0,
  "matricula": "string",
  "nome": "string",
  "turma": "string",
  "curso": "string",
}
```

#### DELETE /alunos/{id}
- **Descrição**: Exclui um aluno
- **Método**: DELETE
- **Parâmetro**: id do aluno

## 🛠️ Tecnologias Utilizadas
- **HTML5**: Estrutura semântica da aplicação
- **CSS3**: Estilização moderna com gradientes e efeitos
- **JavaScript (ES6+)**: Lógica da aplicação e consumo da API
- **Fetch API**: Para requisições HTTP
- **Async/Await**: Para programação assíncrona

### Front-end com Bootstrap
- A interface foi simplificada e refatorada para usar o Bootstrap 5 (CDN). Isso reduz a necessidade de CSS customizado e garante responsividade imediata.

### Separação de páginas
- O formulário de criação/edição foi movido para `form.html`. A `index.html` agora contém apenas a lista de alunos e ações (novo, editar, excluir). O fluxo de edição abre `form.html?id=<id>` para carregar o aluno.

### Atalho `$` (seleção rápida de elementos)

Para economizar digitação e deixar os exemplos mais limpos em aula, usamos um pequeno atalho para `document.querySelector`:

```javascript
// forma curta (arrow function usada no arquivo)
const $ = s => document.querySelector(s);

// uso
const nomeInput = $('#nome'); // equivalente a document.querySelector('#nome')

// forma equivalente mais explícita
function $(s) {
  return document.querySelector(s);
}
```

Explicação rápida:
- `s` é uma string com um seletor CSS (ex.: `'#id'`, `'.classe'`, `'input[type="text"]'`).
- `$` retorna o PRIMEIRO elemento que casar com o seletor (mesmo comportamento de `querySelector`).
- Se precisar de vários elementos, usamos `$$` como atalho para `document.querySelectorAll`, que retorna um NodeList. Exemplo:

```javascript
const $$ = s => document.querySelectorAll(s);
const itens = $$('.card'); // NodeList de elementos com classe .card
```

Observações:
- `NodeList` é parecido com um array mas não é um Array real; você pode iterar com `forEach` ou converter para Array (`Array.from(nodeList)`) se precisar de métodos de array.

## 📁 Estrutura do Projeto
```
Pratica06/
├── index.html          # Página principal (lista de alunos)
├── form.html           # Página de criação/edição de alunos
├── js/
│   ├── script.js       # Lógica: listagem e exclusão
│   └── form.js         # Lógica: criação/edição
└── README.md           # Documentação
```

## 🚀 Como Usar

### 1. Cadastrar aluno
1. Preencha os campos "Nome do aluno" e "Preço"
2. Clique em "Adicionar aluno"
3. O aluno será salvo e aparecerá na lista

### 2. Editar aluno
1. Clique no botão "Editar" na linha do aluno desejado
2. Os dados serão carregados no formulário
3. Modifique os campos necessários
4. Clique em "Atualizar aluno"

### 3. Excluir aluno
1. Clique no botão "Excluir" na linha do aluno desejado
2. Confirme a exclusão na janela de confirmação
3. O aluno será removido da lista

## 🔧 Funcionalidades Técnicas

### Tratamento de Erros
- Validação de formulário
- Tratamento de erros de rede
- Mensagens de feedback claras
- Fallbacks para falhas de conexão

### Interface Responsiva
- Layout adaptável para diferentes dispositivos
- Tabela responsiva com scroll horizontal
- Botões otimizados para touch

### UX/UI
- Loading indicators durante requisições
- Mensagens de sucesso/erro temporárias
- Confirmação antes de excluir
- Scroll automático para formulário em edição

## 📝 Observações Importantes

### CORS
A API utilizada deve ter CORS configurado para permitir requisições do browser.

### Validações
- Campos obrigatórios no formulário
- Validação de tipo numérico para preço
- Preço mínimo de R$ 0,00

### Tratamento de Estados
- Estado de loading durante requisições
- Estado de edição vs. criação
- Cancelamento de edição

## Exemplos de requisições (curl)

Use estes exemplos para testar a API a partir do terminal. Substitua os IDs e dados conforme necessário.

- Listar alunos (GET):

```bash
curl -i https://proweb.leoproti.com.br/alunos
```

- Criar aluno (POST):

```bash
curl -i -X POST https://proweb.leoproti.com.br/alunos \
  -H "Content-Type: application/json" \
  -d '{"nome":"aluno Exemplo","preco":99.90}'
```

- Atualizar aluno (PUT):

```bash
curl -i -X PUT https://proweb.leoproti.com.br/alunos/123 \
  -H "Content-Type: application/json" \
  -d '{"id":123,"nome":"aluno Atualizado","preco":79.90}'
```

- Remover aluno (DELETE):

```bash
curl -i -X DELETE https://proweb.leoproti.com.br/alunos/123
```

## Testando localmente (evitar erro CORS)

Durante o desenvolvimento, abra a pasta `Pratica06` a partir de um servidor HTTP (não use file://). Exemplos:

Powershell (recomendado):

```powershell
npx http-server . -p 3000 --cors
# ou, se preferir Python:
# python -m http.server 3000
```

Depois, abra no navegador:

http://127.0.0.1:3000/Praticas/Pratica06/

Se a API remota não permitir CORS, use as opções abaixo para demonstração em sala de aula:

- Solicitar ao responsável da API que habilite CORS para seu domínio ou para "*" (apenas para teste).
- Usar um proxy reverso local que adicione os cabeçalhos CORS.
- Trabalhar com dados mock (ex.: arquivos JSON locais) até a API estar disponível.

---

**Desenvolvido para a disciplina de Programação Web - Newton Paiva**

*Esta aplicação demonstra conceitos fundamentais de desenvolvimento web moderno, incluindo consumo de APIs REST, manipulação do DOM e programação assíncrona.*

## Exemplos em PowerShell (Windows)

Se os alunos estiverem em Windows/Powershell, podem usar `Invoke-RestMethod` para obter e processar a lista de alunos. Exemplo para listar nomes:

```powershell
$alunos = Invoke-RestMethod -Uri 'https://proweb.leoproti.com.br/alunos' -Method Get
$nomes = $alunos | ForEach-Object { $_.nome }
$nomes
```

Este comando retorna uma lista com os nomes dos alunos.

## 🧠 Exercício rápido

Enunciado: usando os atalhos `$` e `$$` presentes nos scripts, escreva um pequeno trecho de código que:

- selecione todos os nomes de alunos visíveis na tabela (`<td>` com o nome)
- gere um array com esses nomes e mostre no console

Solução sugerida (para discutir em sala):

```javascript
// Seleciona todas as células que representam o nome do aluno
const nomeCells = document.querySelectorAll('#alunos-table tbody tr td:nth-child(2)');
// Converte NodeList para array e extrai o texto
const nomes = Array.from(nomeCells).map(td => td.textContent.trim());
console.log(nomes);

// Usando o atalho $$ definido nos scripts (se disponível)
// const nomeCells = $$('#alunos-table tbody tr td:nth-child(2)');
// const nomes = Array.from(nomeCells).map(td => td.textContent.trim());
// console.log(nomes);
```

Objetivo do exercício: praticar seleção de elementos com seletores CSS e conversão de NodeList para Array para uso de métodos como `map`.

## Versões mínimas (úteis para aula rápida)

Existem duas versões ainda mais curtas dos scripts, pensadas para demonstração rápida em sala:

- `js/script.minimo.js`: lista alunos e permite excluir com poucas linhas.
- `js/form.minimo.js`: cria/atualiza aluno (POST/PUT) com código direto.

Como usar durante a aula:

1. Abra `index.html` e no final da página substitua temporariamente `script.js` por `script.minimo.js`.
2. Abra `form.html` e substitua `form.js` por `form.minimo.js`.
3. Recarregue a página e demonstre o fluxo mínimo (GET -> listagem; POST/PUT -> salvar).

Depois da explicação, reverta as tags para `script.js` e `form.js` se quiser mostrar a versão completa e comentada.

---

**Desenvolvido para a disciplina de Programação Web - Newton Paiva**
