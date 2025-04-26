// Sistema de competição para o projeto Paixão na Veia

document.addEventListener('DOMContentLoaded', function() {
    // Dados dos times reais de futebol
    const teamsData = [
        {
            id: 'flamengo',
            name: 'Flamengo',
            donors: 8,
            supporters: 5,
            total: 13,
            history: [10, 13],
            color: '#e70013'
        },
        {
            id: 'vasco',
            name: 'Vasco',
            donors: 10,
            supporters: 7,
            total: 17,
            history: [9, 17],
            color: '#000000'
        },
        {
            id: 'palmeiras',
            name: 'Palmeiras',
            donors: 1,
            supporters: 0,
            total: 1,
            history: [1, 1],
            color: '#006437'
        },
        {
            id: 'botafogo',
            name: 'Botafogo',
            donors: 5,
            supporters: 2,
            total: 7,
            history: [5, 7],
            color: '#000000'
        },
        {
            id: 'fluminense',
            name: 'Fluminense',
            donors: 1,
            supporters: 1,
            total: 2,
            history: [1, 2],
            color: '#792f40'
        }
    ];
    
    // Função para atualizar o ranking dos times
    function updateRanking() {
        const rankingContainer = document.getElementById('ranking-container');
        if (!rankingContainer) return;
        
        // Limpar conteúdo atual
        rankingContainer.innerHTML = '';
        
        // Ordenar times por número total de participantes (doadores + apoiadores) (decrescente)
        const sortedTeams = [...teamsData].sort((a, b) => b.total - a.total);
        
        // Criar elementos para cada time
        sortedTeams.forEach((team, index) => {
            const teamElement = document.createElement('div');
            teamElement.className = 'team';
            teamElement.innerHTML = `
                <div class="team-icon">
                    <i class="fas fa-futbol"></i>
                </div>
                <h3>${team.name}</h3>
                <p>${index === 0 ? 'Líder atual' : `${index + 1}º lugar`}</p>
                <div class="counter" data-target="${team.total}">0</div>
                <p>Participantes</p>
                <div class="team-details">
                    <span>${team.donors} doadores</span> | 
                    <span>${team.supporters} apoiadores</span>
                </div>
            `;
            rankingContainer.appendChild(teamElement);
        });
        
        // Reiniciar animação dos contadores
        animateCounters();
    }
    
    // Função para animar os contadores
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Função para gerar o gráfico de evolução dos times
    function generateChart() {
        const chartContainer = document.getElementById('teams-chart');
        if (!chartContainer || typeof Chart === 'undefined') return;
        
        // Preparar dados para o gráfico
        const labels = ['07/04/2024', '10/07/2024', '03/10/2024', '05/01/2025'];
        const datasets = teamsData.map(team => {
            return {
                label: team.name,
                data: team.history,
                borderColor: team.color,
                backgroundColor: `${team.color}33`,
                borderWidth: 3,
                tension: 0.3,
                fill: false,
                pointBackgroundColor: '#fff',
                pointBorderColor: team.color,
                pointBorderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 7
            };
        });
        
        // Criar o gráfico
        new Chart(chartContainer, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#fff',
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            padding: 20,
                            usePointStyle: true,
                            boxWidth: 10
                        }
                    },
                    title: {
                        display: true,
                        color: '#fff',
                        text: 'Evolução dos Times nos Últimos Eventos',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        ticks: {
                            color: '#fff',
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        ticks: {
                            color: '#fff',
                            font: {
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Função para registrar novo participante (doador ou apoiador)
    function registerParticipant(teamId, type) {
        // Encontrar o time pelo ID
        const team = teamsData.find(t => t.id === teamId);
        if (!team) return false;
        
        // Incrementar o número de doadores ou apoiadores
        if (type === 'doador') {
            team.donors++;
        } else if (type === 'apoiador') {
            team.supporters++;
        } else {
            return false;
        }
        
        // Atualizar o total
        team.total = team.donors + team.supporters;
        
        // Atualizar a interface
        updateRanking();
        
        return true;
    }
    
    // Inicializar o sistema de competição
    function initCompetitionSystem() {
        // Atualizar o ranking inicial
        updateRanking();
        
        // Adicionar listeners para o formulário de registro de participação
        const donationForm = document.getElementById('donation-form');
        if (donationForm) {
            donationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const teamSelect = document.getElementById('team-select');
                const participantType = document.getElementById('participant-type');
                
                if (teamSelect && participantType) {
                    const teamId = teamSelect.value;
                    const type = participantType.value;
                    
                    if (registerParticipant(teamId, type)) {
                        // Exibir mensagem de sucesso
                        const formMessage = document.getElementById('donation-form-message');
                        if (formMessage) {
                            const messageText = type === 'doador' 
                                ? 'Doação registrada com sucesso! Obrigado pela sua contribuição.'
                                : 'Participação como apoiador registrada com sucesso! Obrigado pela sua presença.';
                            
                            formMessage.textContent = messageText;
                            formMessage.style.color = 'green';
                            
                            // Limpar o formulário
                            donationForm.reset();
                            
                            // Limpar a mensagem após 5 segundos
                            setTimeout(() => {
                                formMessage.textContent = '';
                            }, 5000);
                        }
                    }
                }
            });
        }
        
        // Tentar gerar o gráfico se a biblioteca Chart.js estiver disponível
        if (typeof Chart !== 'undefined') {
            generateChart();
        }
    }
    
    // Iniciar o sistema quando o DOM estiver pronto
    initCompetitionSystem();
});
