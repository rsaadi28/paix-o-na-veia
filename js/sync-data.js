// Script para sincronizar dados entre o painel administrativo e o site principal

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há dados atualizados no localStorage
    checkForUpdatedData();
    
    // Ouvir mensagens do painel administrativo
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'updateData') {
            console.log('Recebendo dados atualizados do painel administrativo');
            
            // Atualizar dados dos times
            if (event.data.teamsData) {
                localStorage.setItem('mainSiteTeamsData', event.data.teamsData);
            }
            
            // Atualizar data do evento
            if (event.data.eventDate) {
                localStorage.setItem('mainSiteEventDate', event.data.eventDate);
            }
            
            // Atualizar a página com os novos dados
            updatePageWithNewData();
        }
    });
});

// Verificar se há dados atualizados no localStorage
function checkForUpdatedData() {
    const teamsData = localStorage.getItem('mainSiteTeamsData');
    const eventDate = localStorage.getItem('mainSiteEventDate');
    
    if (teamsData || eventDate) {
        updatePageWithNewData();
    }
}

// Atualizar a página com os novos dados
function updatePageWithNewData() {
    // Atualizar a data do próximo evento
    updateEventDate();
    
    // Atualizar o ranking dos times
    updateTeamsRanking();
    
    // Atualizar a contagem regressiva
    updateCountdown();
}

// Atualizar a data do próximo evento
function updateEventDate() {
    const eventDate = localStorage.getItem('mainSiteEventDate');
    if (!eventDate) return;
    
    const eventDateElements = document.querySelectorAll('.next-event-date');
    eventDateElements.forEach(element => {
        element.textContent = eventDate;
    });
    
    // Atualizar a data para o cálculo da contagem regressiva
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        // Converter a data formatada de volta para um objeto Date
        const dateParts = eventDate.split(' de ');
        if (dateParts.length === 3) {
            const day = parseInt(dateParts[0]);
            const monthNames = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
            const month = monthNames.indexOf(dateParts[1].toLowerCase());
            const year = parseInt(dateParts[2]);
            
            if (!isNaN(day) && month !== -1 && !isNaN(year)) {
                const newEventDate = new Date(year, month, day);
                window.nextEventDate = newEventDate; // Atualizar variável global
            }
        }
    }
}

// Atualizar o ranking dos times
function updateTeamsRanking() {
    const teamsDataStr = localStorage.getItem('mainSiteTeamsData');
    if (!teamsDataStr) return;
    
    try {
        const teamsData = JSON.parse(teamsDataStr);
        const rankingContainer = document.querySelector('.ranking-list');
        if (!rankingContainer) return;
        
        // Ordenar times por total de participantes (decrescente)
        const sortedTeams = [...teamsData].sort((a, b) => b.total - a.total);
        
        // Limpar o conteúdo atual
        rankingContainer.innerHTML = '';
        
        // Adicionar cada time ao ranking
        sortedTeams.forEach((team, index) => {
            const rankItem = document.createElement('div');
            rankItem.className = 'ranking-item';
            rankItem.innerHTML = `
                <div class="ranking-position">${index + 1}</div>
                <div class="ranking-team-info">
                    <h3>${team.name}</h3>
                    <div class="team-stats">
                        <span class="donors">Doadores: ${team.donors}</span>
                        <span class="supporters">Apoiadores: ${team.supporters}</span>
                        <span class="total">Total: ${team.total}</span>
                    </div>
                </div>
            `;
            rankingContainer.appendChild(rankItem);
        });
    } catch (e) {
        console.error('Erro ao atualizar ranking dos times:', e);
    }
}

// Atualizar a contagem regressiva
function updateCountdown() {
    if (!window.nextEventDate) return;
    
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Calcular tempo restante
    const now = new Date();
    const timeLeft = window.nextEventDate - now;
    
    if (timeLeft <= 0) {
        countdownElement.innerHTML = 'O evento já começou!';
        return;
    }
    
    // Calcular dias, horas, minutos e segundos
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Atualizar o elemento de contagem regressiva
    countdownElement.innerHTML = `
        <div class="countdown-item">
            <span class="countdown-number">${days}</span>
            <span class="countdown-label">Dias</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-number">${hours}</span>
            <span class="countdown-label">Horas</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-number">${minutes}</span>
            <span class="countdown-label">Minutos</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-number">${seconds}</span>
            <span class="countdown-label">Segundos</span>
        </div>
    `;
}
