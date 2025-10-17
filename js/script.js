// script.simple.js
// Versão comentada linha-a-linha para uso em aula
// Objetivo: listar alunos da API e permitir exclusão usando Fetch

// URL base da API (mudar se for necessário)
const API = 'https://proweb.leoproti.com.br/alunos';

// ----- Seletores rápidos (atalhos para o DOM) -----
// $('seletor') -> retorna o primeiro elemento que casa com o seletor
const $ = s => document.querySelector(s);
// $$('seletor') -> retorna NodeList com todos os elementos que casam
const $$ = s => document.querySelectorAll(s);

// ----- Elementos usados na página -----
// tbody da tabela onde os alunos serão inseridos
const tbody = $('#alunos-table tbody');
// div que mostra o estado de carregamento
const loading = $('#loading');
// div usada para mostrar mensagens ao usuário
const message = $('#message');

// ----- Funções utilitárias -----
// Alterna o indicador de 'loading' (mostrar/ocultar)
function setLoading(on) {
    // Se o elemento não existir, sai (evita erros em testes)
    if (!loading) return;
    // Exibe o elemento quando 'on' for true, caso contrário oculta
    loading.style.display = on ? 'block' : 'none';
}

// Mostra uma mensagem curta (tipo: 'success' ou 'error') e some após 3s
function showMessage(text, type = 'success') {
    // Se não há elemento de mensagem, sai
    if (!message) return;
    // Define o texto da mensagem
    message.textContent = text;
    // Define classes do Bootstrap para estilo (verde/vermelho)
    message.className = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
    // Mostra a div
    message.style.display = 'block';
    // Após 3 segundos, oculta novamente
    setTimeout(() => { message.style.display = 'none'; }, 3000);
}

// Função pequena e genérica para chamar a API e retornar um objeto com {ok,status,data}
async function callApi(path = '', opts = {}) {
    // Faz a chamada fetch para API completa (API + path)
    const res = await fetch(API + path, { mode: 'cors', headers: { 'Content-Type': 'application/json' }, ...opts });
    // Lê o corpo como texto (pode estar vazio)
    const txt = await res.text();
    // Tenta fazer parse JSON; se falhar, retorna o texto cru
    try {
        return { ok: res.ok, status: res.status, data: txt ? JSON.parse(txt) : null };
    } catch (e) {
        return { ok: res.ok, status: res.status, data: txt };
    }
}

// ----- Carregar dados -----
// Busca os alunos e chama 'renderizar' para mostrar na tabela
async function carregaralunos() {
    // Mostra indicador de carregamento
    setLoading(true);
    try {
        // Chama a API na raiz (GET /alunos)
        const r = await callApi('');
        // Se a resposta for OK e vier um array, renderiza os alunos
        if (r.ok && Array.isArray(r.data)) renderizar(r.data);
        else renderizar([]); // caso contrário, renderiza tabela vazia
    } catch (e) {
        // Se houver erro de rede (ex.: CORS ou API off), usamos dados de exemplo
        renderizar([
            { id: 1, matricula: '123456', nome: 'Fulano de Tal', turma: 'Turma A', curso: 'Curso X' },
            { id: 2, matricula: '789101', nome: 'Sicrnao da Silva', turma: 'Turma B', curso: 'Curso Y' }
        ]);
        // Mostra mensagem informando que estamos em modo offline
        showMessage('Modo offline: usando dados de exemplo', 'error');
    } finally {
        // Esconde o indicador de carregamento sempre
        setLoading(false);
    }
}

// ----- Renderizar tabela -----
// Recebe um array de alunos e popula o tbody
function renderizar(alunos) {
    // Limpa o conteúdo atual
    tbody.innerHTML = '';
    // Se não houver alunos, mostra uma linha informando isso
    if (!alunos || alunos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">Nenhum aluno</td></tr>';
        return; // sai da função
    }

    // Para cada aluno, cria uma linha na tabela
    alunos.forEach(p => {
        const tr = document.createElement('tr'); // cria <tr>
        // Preenche a linha usando template string. Note que formatamos o preço.
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.matricula}</td>
            <td>${p.nome}</td>
            <td>${p.turma}</td>
            <td>${p.curso}</td>
            <td>
                <a class="btn btn-sm btn-primary" href="form.html?id=${p.id}">Editar</a>
                <button class="btn btn-sm btn-danger btn-delete" data-id="${p.id}" data-nome="${p.nome}">Excluir</button>
            </td>`;
        // Anexa a linha ao tbody
        tbody.appendChild(tr);
    });

    // Depois de inserir as linhas, pegamos todos os botões de excluir e associamos o evento
    $$('.btn-delete').forEach(btn => btn.addEventListener('click', () => {
        // Lê id e nome do dataset do botão
        const id = btn.dataset.id;
        const nome = btn.dataset.nome;
        // Pergunta confirmação ao usuário antes de excluir
        if (confirm(`Excluir "${nome}"?`)) excluiraluno(id);
    }));
}

// ----- Excluir aluno -----
// Envia DELETE /alunos/{id} e recarrega a lista se sucesso
async function excluiraluno(id) {
    setLoading(true); // mostra o spinner
    try {
        // Chama a API com método DELETE
        const r = await callApi('/' + id, { method: 'DELETE' });
        // Se OK, mostra mensagem e recarrega a lista
        if (r.ok) {
            showMessage('aluno excluído', 'success');
            carregaralunos();
        } else {
            // Caso a API retorne erro, mostra mensagem de erro
            showMessage('Erro ao excluir', 'error');
        }
    } catch (e) {
        // Erro de conexão (ex.: CORS ou sem internet)
        showMessage('Erro de conexão', 'error');
    } finally {
        // Sempre oculta o loading
        setLoading(false);
    }
}

// ----- Inicialização -----
// Quando o DOM estiver pronto, executa carregaralunos()
window.addEventListener('DOMContentLoaded', carregaralunos);
