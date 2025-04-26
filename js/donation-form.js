// Formulário de registro de doação para o projeto Paixão na Veia

document.addEventListener('DOMContentLoaded', function() {
    // Adicionar o formulário de registro de doação ao DOM
    const contactSection = document.getElementById('contato');
    if (contactSection) {
        const formContainer = document.createElement('div');
        formContainer.className = 'contact-container';
        formContainer.innerHTML = `
            <div class="contact-info">
                <h3>Registre sua Participação</h3>
                <p>Se você participou do evento "Paixão na Veia", registre aqui sua participação para pontuar para o seu time do coração na competição atual.</p>
                <div class="requisitos">
                    <h3>Requisitos para Doação</h3>
                    <ul class="requisitos-list">
                        <li>Estar em boas condições de saúde</li>
                        <li>Ter entre 16 e 69 anos</li>
                        <li>Pesar no mínimo 50kg</li>
                        <li>Estar descansado e alimentado</li>
                        <li>Apresentar documento original com foto</li>
                    </ul>
                </div>
                <div class="estatisticas">
                    <div class="estatistica">
                        <div class="estatistica-numero">4</div>
                        <div class="estatistica-texto">Vidas salvas por doação</div>
                    </div>
                    <div class="estatistica">
                        <div class="estatistica-numero">242</div>
                        <div class="estatistica-texto">Participantes no último evento</div>
                    </div>
                </div>
            </div>
            <div class="contact-form">
                <form id="donation-form">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Nome Completo" required>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="E-mail" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" class="form-control" placeholder="Telefone" required>
                    </div>
                    <div class="form-group">
                        <select id="team-select" class="form-control" required>
                            <option value="" disabled selected>Selecione seu Time do Coração</option>
                            <option value="flamengo">Flamengo</option>
                            <option value="vasco">Vasco</option>
                            <option value="corinthians">Corinthians</option>
                            <option value="sao-paulo">São Paulo</option>
                            <option value="palmeiras">Palmeiras</option>
                            <option value="fluminense">Fluminense</option>
                            <option value="botafogo">Botafogo</option>
                            <option value="santos">Santos</option>
                            <option value="gremio">Grêmio</option>
                            <option value="internacional">Internacional</option>
                            <option value="cruzeiro">Cruzeiro</option>
                            <option value="atletico-mg">Atlético-MG</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select id="participant-type" class="form-control" required>
                            <option value="" disabled selected>Tipo de Participação</option>
                            <option value="doador">Doador (doei sangue)</option>
                            <option value="apoiador">Apoiador (compareci mas não pude doar)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="date" class="form-control" placeholder="Data da Doação" required>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Local da Doação (Hemocentro)" required>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" placeholder="Observações (opcional)"></textarea>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-submit">Registrar Doação</button>
                    </div>
                    <div id="donation-form-message"></div>
                </form>
            </div>
        `;
        
        // Inserir o formulário antes do formulário de contato existente
        const existingForm = contactSection.querySelector('.contact-container');
        contactSection.querySelector('.container').insertBefore(formContainer, existingForm);
        
        // Adicionar título para o formulário de contato existente
        const contactFormTitle = document.createElement('h3');
        contactFormTitle.textContent = 'Fale Conosco';
        contactFormTitle.style.marginTop = '50px';
        contactFormTitle.style.color = 'var(--primary-color)';
        existingForm.querySelector('.contact-form').insertBefore(contactFormTitle, existingForm.querySelector('.contact-form form'));
    }
});
