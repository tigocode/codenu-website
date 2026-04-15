'use client';
import React, { useState, useEffect } from 'react';

export default function App() {
  // Estados para a Calculadora de ROI
  const [plants, setPlants] = useState(60);
  const [manualHours, setManualHours] = useState(8);
  const [extraCosts, setExtraCosts] = useState(200);
  const [roi, setRoi] = useState(0);

  // Estado para o Formulário de Contacto
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Efeito para calcular o ROI sempre que os inputs mudarem
  useEffect(() => {
    // 1. Horas economizadas (Custo da hora técnica estimado em 40€)
    const hoursSaved = (manualHours * 0.65) * plants * 40 * 12;
    // 2. Redução de custos extras e falhas reembolsáveis
    const costSavings = (extraCosts * 0.3) * plants * 12;

    const totalSavings = hoursSaved + costSavings;
    setRoi(totalSavings);
  }, [plants, manualHours, extraCosts]);

  // Formatador de Moeda
  const formattedRoi = 'R$ ' + roi.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Função principal para lidar com o envio
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Impede o formulário de recarregar a página

    // 1. Capturar os dados do formulário de forma simples
    const formData = new FormData(e.target);
    const data = {
      nome: formData.get('nome'),
      empresa: formData.get('empresa'),
      email: formData.get('email'),
      whatsapp: formData.get('whatsapp'),
      ferramenta: formData.get('ferramenta')
    };

    // 2. Criar a mensagem formatada com os dados reais
    const messageContent = `🌟 Olá, tudo bem com você? 😊

🛒Desejo fazer um orçamento de um sistema para minha empresa 💥

 *NOME:* ${data.nome}
 *EMPRESA:* ${data.empresa}
 *TELEFONE:* ${data.whatsapp}
 *EMAIL:* ${data.email}
 *FERRAMENTA DESEJADA:* ${data.ferramenta}`;

    // 3. Codificar a mensagem para URL (converte espaços e símbolos)
    const encodedMessage = encodeURIComponent(messageContent);

    // 4. Definir o número de telefone de destino (coloque o seu número aqui)
    // Formato: 55 + DDD + Numero (ex: 5511999999999)
    const phoneNumber = data.whatsapp;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=55${phoneNumber}&text=${encodedMessage}`;

    // 5. Abrir o WhatsApp numa nova aba
    window.open(whatsappUrl, '_blank');

    // 6. Atualizar o estado para mostrar a mensagem de sucesso na tela
    setIsSubmitted(true);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans">
      {/* Estilos Globais e Animações inseridos via Tag Style para compatibilidade Next.js/React */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Quicksand:wght@700&display=swap');
        
        body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        .logo-font { font-family: 'Quicksand', sans-serif; letter-spacing: -0.02em; }
        .glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); }
        .brand-gradient { background: linear-gradient(135deg, #F59E0B 0%, #6dd7b3ff 100%); }
        .orange-bg { background-color: #F59E0B; }
        .navy-bg { background-color: #0F172A; }
        .card-hover:hover { transform: translateY(-8px); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .accent-orange { color: #F59E0B; }
        
        /* Animação do Slider de Clientes */
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-250px * 4)); }
        }
        .slider-container {
            overflow: hidden;
            width: 100%;
            position: relative;
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .slider-track {
            display: flex;
            width: calc(250px * 8);
            animation: scroll 25s linear infinite;
        }
        .slider-item {
            width: 250px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            filter: grayscale(100%);
            opacity: 0.5;
            transition: all 0.3s ease;
        }
        .slider-item:hover {
            filter: grayscale(0%);
            opacity: 1;
        }
      `}</style>

      {/* Navegação */}
      <nav className="fixed w-full z-50 glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20">C</div>

              {/* LOGO */}
              <div className="flex items-center text-[32px] md:text-[34px] font-[700] text-[#1f2023] logo-font mt-1">
                <span>codenu</span>
              </div>
            </div>

            <div className="hidden md:flex space-x-10 items-center">
              <a href="#solucoes" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition">Ecossistema</a>
              <a href="#clientes" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition">Clientes</a>
              <a href="#roi" className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition">Calculadora</a>
              <a href="#contato" className="orange-bg text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:bg-orange-600 transition-all">Agendar Demonstração</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="inline-flex items-center px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-orange-700 uppercase bg-orange-100 rounded-full border border-orange-200">
            <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
            A Stack Definitiva para Sua empresa
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
            Escalabilidade e Precisão <br />
            para sua <br />
            <span className="bg-gradient-to-br from-amber-500 to-emerald-500 bg-clip-text text-transparent">Prestação de Serviço Solar.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Abandone o amadorismo das planilhas. Entregue relatórios de elite, controle gastos e automatize sua operação com as ferramentas que os maiores players do mercado utilizam.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#contato" className="px-10 py-5 orange-bg text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-500/30 hover:scale-105 transition-transform">Impulsionar meu Negócio</a>
            <a href="#solucoes" className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all">Conhecer o Combo</a>
          </div>
        </div>
      </section>

      {/* Seção Nossos Clientes (Slider Automático) */}
      <section id="clientes" className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">Quem confia na tecnologia Codenu</p>

          <div className="slider-container">
            <div className="slider-track">
              {/* Itens Originais */}
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <img src="https://placehold.co/200x80/ffffff/94a3b8?text=ALIANÇA+SOLAR" alt="Aliança Solar" className="h-10 w-auto" />
                  <span className="text-[9px] mt-2 font-black text-slate-400 uppercase tracking-widest">Aliança Solar</span>
                </div>
              </div>
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <img src="https://placehold.co/200x80/ffffff/94a3b8?text=M2e+SERVIÇOS" alt="M2e Serviços" className="h-10 w-auto" />
                  <span className="text-[9px] mt-2 font-black text-slate-400 uppercase tracking-widest">M2e Serviços</span>
                </div>
              </div>
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-32 bg-slate-200 rounded flex items-center justify-center font-bold text-slate-400 text-xs">SOLAR TECH</div>
                </div>
              </div>
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-32 bg-slate-200 rounded flex items-center justify-center font-bold text-slate-400 text-xs">O&M EXPERT</div>
                </div>
              </div>
              {/* Duplicação para loop infinito */}
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <img src="https://placehold.co/200x80/ffffff/94a3b8?text=ALIANÇA+SOLAR" alt="Aliança Solar" className="h-10 w-auto" />
                  <span className="text-[9px] mt-2 font-black text-slate-400 uppercase tracking-widest">Aliança Solar</span>
                </div>
              </div>
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <img src="https://placehold.co/200x80/ffffff/94a3b8?text=M2e+SERVIÇOS" alt="M2e Serviços" className="h-10 w-auto" />
                  <span className="text-[9px] mt-2 font-black text-slate-400 uppercase tracking-widest">M2e Serviços</span>
                </div>
              </div>
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-32 bg-slate-200 rounded flex items-center justify-center font-bold text-slate-400 text-xs">SOLAR TECH</div>
                </div>
              </div>
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-32 bg-slate-200 rounded flex items-center justify-center font-bold text-slate-400 text-xs">O&M EXPERT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soluções (Os 3 Pilares) */}
      <section id="solucoes" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">O Ecossistema do Prestador de Elite</h2>
            <p className="text-slate-500 text-lg">Três ferramentas, um único objetivo: profissionalizar sua entrega.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Solar Manager */}
            <div className="p-10 bg-slate-50 rounded-3xl border border-slate-100 card-hover">
              <div className="w-14 h-14 orange-bg rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-orange-500/40">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 logo-font">Solar Manager</h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">O cérebro da sua operação. Gestão de Ordens de Serviço, manutenção preventiva e alertas inteligentes para nunca ser pego de surpresa.</p>
              <span className="text-orange-600 font-bold text-[12px] uppercase tracking-wider">Foco: Operação e Manutenção</span>
            </div>

            {/* ReembolsarApp */}
            <div className="p-10 bg-slate-50 rounded-3xl border border-slate-100 card-hover">
              <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-emerald-500/40">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 logo-font">ReembolsarApp</h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">Controle financeiro rigoroso. Gestão de atividades, criação de relatórios técnicos profissionais e domínio total sobre gastos reembolsáveis.</p>
              <span className="text-emerald-600 font-bold text-[12px] uppercase tracking-wider">Foco: Gestão e Financeiro</span>
            </div>

            {/* SolarVision */}
            <div className="p-10 bg-slate-50 rounded-3xl border border-slate-100 card-hover relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 text-[12px] font-black px-2 py-1 rounded">EM IMPLEMENTAÇÃO</div>
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-blue-500/40">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 logo-font">SolarVision IA</h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">Análise termográfica avançada com IA. Gere relatórios técnicos e comerciais de alta precisão que encantam o cliente final.</p>
              <span className="text-blue-600 font-bold text-[12px] uppercase tracking-wider">Foco: Análise e Termografia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculadora ROI */}
      <section id="roi" className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-12">Quanto vale a sua produtividade?</h2>

          <div className="bg-slate-800 p-8 md:p-12 rounded-[40px] border border-slate-700 shadow-2xl">
            <div className="mb-12">
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 text-left">
                Volume de Usinas sob sua Gestão
              </label>
              <input
                type="range"
                min="1"
                max="200"
                value={plants}
                onChange={(e) => setPlants(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between mt-4">
                <span className="text-slate-500 font-bold">1 Usina</span>
                <div className="bg-orange-500 px-6 py-2 rounded-full font-black text-2xl shadow-lg shadow-orange-500/20">
                  {plants}
                </div>
                <span className="text-slate-500 font-bold">200 Usinas</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-3">Tempo p/ Relatório (Horas/Mês)</label>
                <input
                  type="number"
                  value={manualHours}
                  onChange={(e) => setManualHours(Number(e.target.value))}
                  className="w-full bg-slate-700 border-none rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-3">Custos Operacionais Extra (p/ Usina)</label>
                <input
                  type="number"
                  value={extraCosts}
                  onChange={(e) => setExtraCosts(Number(e.target.value))}
                  className="w-full bg-slate-700 border-none rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            <div className="py-10 border-t border-slate-700">
              <p className="text-slate-400 font-medium mb-2 uppercase text-xs tracking-widest">Potencial de Otimização Anual</p>
              <div className="text-6xl font-black text-orange-500">{formattedRoi}</div>
              <p className="text-slate-500 mt-6 text-sm max-w-md mx-auto">
                Com a Codenu, você reduz em até 65% o tempo administrativo e elimina erros de cobrança reembolsável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contato" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-black mb-8 leading-tight text-slate-900">Chegou a hora de ser <span className="accent-orange">Referência.</span></h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Escolha a ferramenta individual ou o **Combo Codenu** para dominar o mercado de O&M. Nossa equipe técnica está pronta para configurar sua nova central de comando.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">Suporte de Especialista</h4>
                    <p className="text-slate-500 text-sm">Configuramos seus primeiros alertas e relatórios junto com você.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">Aumento de Margem</h4>
                    <p className="text-slate-500 text-sm">Reduza custos fixos e aumente sua capacidade de atendimento.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>

              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="relative z-10 space-y-5">
                  <h3 className="text-2xl font-bold text-white mb-6">Solicitar Apresentação</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <input name="nome" required type="text" placeholder="Nome" className="w-full bg-slate-800 border-none rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 outline-none" />
                    <input name="empresa" required type="text" placeholder="Empresa" className="w-full bg-slate-800 border-none rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>

                  <input name="email" required type="email" placeholder="E-mail Corporativo" className="w-full bg-slate-800 border-none rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 outline-none" />

                  <input name="whatsapp" required type="tel" placeholder="WhatsApp (com DDD)" className="w-full bg-slate-800 border-none rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 outline-none" />

                  <select name="ferramenta" className="w-full bg-slate-800 border-none rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-orange-500 outline-none appearance-none">
                    <option value="Combo Codenu">Combo Codenu (Todas as Ferramentas)</option>
                    <option value="Solar Manager">Somente Solar Manager</option>
                    <option value="ReembolsarApp">Somente ReembolsarApp</option>
                    <option value="SolarVision IA">Lista de Espera SolarVision IA</option>
                  </select>

                  <button type="submit" className="w-full py-5 bg-orange-500 text-white rounded-xl font-black text-xl hover:bg-orange-600 shadow-xl shadow-orange-500/20 transition-all">
                    Começar Transformação
                  </button>
                </form>
              ) : (
                <div className="relative z-10 text-center py-12">
                  <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/40">
                    <svg fill="currentColor" viewBox="0 0 20 20" className="w-12 h-12">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 text-center">Solicitação Recebida!</h3>
                  <p className="text-slate-400 text-center">Em breve um consultor chamará você no WhatsApp para agendar sua demo.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center text-white text-xs font-bold">C</div>

            {/* LOGO FOOTER */}
            <div className="flex items-center text-[24px] font-[700] text-[#1f2023] logo-font mt-1">
              <span>codenu</span>
            </div>
          </div>
          <div className="flex justify-center space-x-8 mb-8 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-orange-500 transition">Privacidade</a>
            <a href="#" className="hover:text-orange-500 transition">Termos</a>
            <a href="#" className="hover:text-orange-500 transition">LinkedIn</a>
          </div>
          <p className="text-slate-400 text-[10px] tracking-widest font-black uppercase">© 2024 CODENU TECNOLOGIA. FEITO PARA QUEM MOVE O MERCADO SOLAR.</p>
        </div>
      </footer>
    </div>
  );
}