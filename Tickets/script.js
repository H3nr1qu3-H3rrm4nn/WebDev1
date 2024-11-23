function carregarEventos() {
    fetch('eventos.json')  // Carrega o arquivo JSON
        .then(response => response.json())  // Converte para JSON
        .then(data => {
            // Agrupa os eventos por data
            const eventosAgrupados = data.reduce((acc, evento) => {
                if (!acc[evento.data]) {
                    acc[evento.data] = [];
                }
                acc[evento.data].push(evento);
                return acc;
            }, {});

            // Seleciona todos os containers com a classe 'eventos-container'
            const containers = document.querySelectorAll('.event-list');

            // Para cada container encontrado
            containers.forEach(container => {
                container.innerHTML = ''; // Limpa o conteúdo anterior (caso haja)

                // Para cada data e seus eventos
                for (const data in eventosAgrupados) {
                    const section = document.createElement('section');
                    section.classList.add('my-4');

                    // Cabeçalho da data
                    const header = document.createElement('h2');
                    header.classList.add('text-center');
                    header.textContent = `Eventos de ${data}`;
                    section.appendChild(header);

                    // Cria os cards para cada evento
                    const row = document.createElement('div');
                    row.classList.add('row');

                    eventosAgrupados[data].forEach(evento => {
                        const col = document.createElement('div');
                        col.classList.add('col-md-4', 'mb-3');

                        const card = document.createElement('div');
                        card.classList.add('card');

                        // Título do evento
                        const cardHeader = document.createElement('div');
                        cardHeader.classList.add('card-header');
                        cardHeader.textContent = evento.nome;
                        card.appendChild(cardHeader);

                        // Corpo do card
                        const cardBody = document.createElement('div');
                        cardBody.classList.add('card-body');
                        cardBody.innerHTML = `
                            <p><strong>Hora:</strong> ${evento.hora}</p>
                            <p><strong>Local:</strong> ${evento.local}</p>
                            <p><strong>Preço:</strong> R$${evento.preco}</p>
                        `;
                        card.appendChild(cardBody);

                        // Adiciona o card à coluna e a coluna à linha
                        col.appendChild(card);
                        row.appendChild(col);
                    });

                    // Adiciona a linha com os cards à seção
                    section.appendChild(row);

                    // Adiciona a seção ao container
                    container.appendChild(section);
                }
            });
        })
        .catch(error => console.error('Erro ao carregar eventos:', error));
}

window.onload = carregarEventos;