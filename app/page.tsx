'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function App() {
  // Estados para a Calculadora de ROI
  const [plants, setPlants] = useState(15);
  const [manualHours, setManualHours] = useState(8);
  const [extraCosts, setExtraCosts] = useState(200);

  // NOVO AJUSTE: Estados separados para visão Mensal e Anual
  const [roiAnnual, setRoiAnnual] = useState(0);
  const [roiMonthly, setRoiMonthly] = useState(0);
  const [hoursAnnual, setHoursAnnual] = useState(0);
  const [hoursMonthly, setHoursMonthly] = useState(0);

  // Estado para o Formulário de Contacto
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Efeito para calcular o ROI sempre que os inputs mudarem
  useEffect(() => {
    // NOVO AJUSTE: Lógica atualizada para calcular Mensal e Anual
    const hMonthly = manualHours * 0.80 * plants; // 80% do tempo economizado por mês (todas as usinas)
    const hAnnual = hMonthly * 12;

    setHoursMonthly(hMonthly);
    setHoursAnnual(hAnnual);

    // Economia Financeira: Valor da hora + Redução de custos extras
    const moneyMonthly = (hMonthly * 40) + (extraCosts * 0.3 * plants);
    const moneyAnnual = moneyMonthly * 12;

    setRoiMonthly(moneyMonthly);
    setRoiAnnual(moneyAnnual);
  }, [plants, manualHours, extraCosts]);

  // Formatadores de Moeda
  const formattedRoiAnnual = 'R$ ' + roiAnnual.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedRoiMonthly = 'R$ ' + roiMonthly.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Função principal para lidar com o envio
  const handleFormSubmit = (e: any) => {
    e.preventDefault(); // Impede o formulário de recarregar a página

    // 1. Capturar os dados do formulário de forma simples
    const formData = new FormData(e.currentTarget);
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
        .brand-gradient { background: linear-gradient(135deg, rgba(11, 70, 245, 1) 0%, #10B981 100%); }
        .orange-bg { background-color: #50ad8eff; }
        .navy-bg { background-color: #0F172A; }
        .card-hover:hover { transform: translateY(-8px); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .accent-orange { color: #50ad8eff; }
        
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
            <a href="#" className="flex items-center gap-3">
              {/* LOGO */}
              <div className="flex items-center text-[28px] md:text-[34px] font-[700] text-[#1f2023] logo-font mt-1">
                <Image src="/logo-elo-sem-fundo.png" alt="Logo" width={80} height={80} />
              </div>
            </a>

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
            A Solução Definitiva para sua empresa
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
            <a href="#contato" className="px-10 py-5 orange-bg text-white rounded-2xl font-black text-lg shadow-xl shadow-green-500/30 hover:scale-105 transition-transform">Impulsionar meu Negócio</a>
            <a href="#solucoes" className="px-10 py-5 bg-white border-2 border-slate-300 text-slate-700 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all">Conhecer o Combo</a>
          </div>
        </div>
      </section>

      {/* Seção Nossos Clientes (Slider Automático) */}
      <section id="clientes" className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.7em] mb-10">Quem confia na tecnologia Elo</p>

          <div className="slider-container">
            <div className="slider-track">
              {/* Itens Originais */}
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <img src="/M2e-Servicos-logo.png" alt="M2e Serviços" width={100} height={100} />
                </div>
              </div>
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <img src="/Alianca-logo-ajustado.png" alt="Aliança Solar" width={100} height={100} />
                </div>
              </div>
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <img src="/M2e-Servicos-logo.png" alt="M2e Serviços" width={100} height={100} />
                </div>
              </div>
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <img src="/Alianca-logo-ajustado.png" alt="Aliança Solar" width={100} height={100} />
                </div>
              </div>
              {/* Duplicação para loop infinito */}
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <img src="/M2e-Servicos-logo.png" alt="M2e Serviços" width={100} height={100} />
                </div>
              </div>
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <img src="/Alianca-logo-ajustado.png" alt="Aliança Solar" width={100} height={100} />
                </div>
              </div>
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <img src="/M2e-Servicos-logo.png" alt="M2e Serviços" width={100} height={100} />
                </div>
              </div>
              <div className="slider-item">
                <div className="flex flex-col items-center">
                  <img src="/Alianca-logo-ajustado.png" alt="Aliança Solar" width={100} height={100} />
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
            <div className="p-10 bg-slate-50 rounded-2xl border border-slate-100 card-hover">
              <div className="w-14 h-14 orange-bg rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-green-500/40">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 logo-font">Solar Manager</h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">O cérebro da sua operação. Gestão de Ordens de Serviço, manutenção preventiva e alertas inteligentes para nunca ser pego de surpresa.</p>
              <a href="https://cta-manager.codenu.com.br/" target="_blank" rel="noopener noreferrer" className="flex gap-1">
                <span className="text-orange-600 font-bold text-[10px] uppercase tracking-wider mb-6">Foco: Operação e Manutenção</span>
                <span className="text-orange-600 font-bold text-[10px] tracking-wider">(Saiba mais)</span>
              </a>
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
              <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-wider">Foco: Gestão e Financeiro</span>
            </div>

            {/* SolarVision */}
            <div className="p-10 bg-slate-50 rounded-3xl border border-slate-100 card-hover relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-1 rounded">EM IMPLEMENTAÇÃO</div>
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-blue-500/40">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 logo-font">SolarVision IA</h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">Análise termográfica avançada com IA. Gere relatórios técnicos e comerciais de alta precisão que encantam o cliente final.</p>
              <span className="text-blue-600 font-bold text-[10px] uppercase tracking-wider">Foco: Análise e Termografia</span>
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
                max="100"
                value={plants}
                onChange={(e) => setPlants(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <div className="flex justify-between mt-4">
                <span className="text-slate-400 font-bold">1 Usina</span>
                <div className="bg-green-500 px-6 py-2 rounded-full font-black text-2xl shadow-lg shadow-green-500/20">
                  {plants}
                </div>
                <span className="text-slate-400 font-bold">100 Usinas</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-3">Tempo p/ Relatório (Horas/Mês)</label>
                <input
                  type="number"
                  value={manualHours}
                  onChange={(e) => setManualHours(Number(e.target.value))}
                  className="w-full bg-slate-700 border-none rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-3">Custos Operacionais Extra (p/ Usina)</label>
                <input
                  type="number"
                  value={extraCosts}
                  onChange={(e) => setExtraCosts(Number(e.target.value))}
                  className="w-full bg-slate-700 border-none rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            {/* NOVO AJUSTE: Visão Mensal em destaque principal, seguida da projeção Anual (12 meses) */}
            <div className="py-10 border-t border-slate-700">
              <div className="grid md:grid-cols-2 gap-8 items-stretch">
                {/* Bloco 1: Retorno Monetário */}
                <div className="text-left flex flex-col justify-center">
                  <p className="text-slate-400 font-medium mb-2 uppercase text-xs tracking-widest">Economia Financeira</p>
                  <div className="flex flex-col mb-4">
                    {/* Destaque Mensal */}
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl md:text-5xl font-black text-[#F59E0B]">{formattedRoiMonthly}</span>
                      <span className="text-slate-500 font-bold text-lg uppercase tracking-wider">/Mês</span>
                    </div>
                    {/* Projeção Anual (12 meses) */}
                    <div className="inline-block mt-2 bg-slate-700/50 rounded-lg px-4 py-3 border border-slate-600/50 w-fit">
                      <span className="text-slate-300 font-medium">Economia projetada de <span className="text-[#F59E0B] font-bold">{formattedRoiAnnual}</span> em 12 meses</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mt-2 max-w-sm">
                    Calculado com base na valorização da hora técnica e redução de erros operacionais.
                  </p>
                </div>

                {/* Bloco 2: Retorno em Tempo */}
                <div className="bg-slate-700/40 rounded-3xl p-6 border border-slate-600/50 text-left relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#6dd7b3]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <p className="text-slate-400 font-medium mb-2 uppercase text-xs tracking-widest">Tempo Recuperado</p>

                  <div className="flex flex-col mb-5">
                    {/* Destaque Mensal */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-black text-[#6dd7b3]">{hoursMonthly.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
                      <span className="text-[#6dd7b3]/60 font-bold text-lg uppercase tracking-wider">Horas/Mês</span>
                    </div>
                    {/* Projeção Anual (12 meses) */}
                    <div className="inline-block mt-2 bg-slate-800/50 rounded-lg px-4 py-2 border border-slate-600/50 w-fit">
                      <span className="text-slate-300 font-medium text-sm">Ou <span className="text-[#6dd7b3] font-bold">{hoursAnnual.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} horas</span> poupadas em 1 ano</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#6dd7b3]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-[#6dd7b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <p className="text-slate-300 text-sm font-medium">Economia garantida de <span className="text-white font-bold">80% do tempo</span> em relatórios.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#6dd7b3]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-[#6dd7b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <p className="text-slate-300 text-sm font-medium">Equivalente a <span className="text-white font-bold">{Math.round(hoursMonthly / 8)} dias úteis</span> livres por mês para novos negócios.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão CTA */}
              <div className="mt-10 pt-8 border-t border-slate-700/50 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-slate-400 text-sm max-w-sm">Pare de desperdiçar o potencial da sua equipe em tarefas que a Solsas faz em segundos.</p>
                <a href="#contato" className="inline-block px-8 py-4 bg-[#6dd7b3] text-[#0F172A] rounded-xl font-black text-lg hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[#6dd7b3]/20 w-full md:w-auto text-center">
                  Quero estes resultados
                </a>
              </div>
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
                Escolha a ferramenta individual ou o **Combo Elo** para dominar o mercado de O&M. Nossa equipe técnica está pronta para configurar sua nova central de comando.
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
                    <input required type="text" placeholder="Nome" className="w-full bg-slate-800 border-none rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-green-500 outline-none" />
                    <input required type="text" placeholder="Empresa" className="w-full bg-slate-800 border-none rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <input required type="email" placeholder="E-mail Corporativo" className="w-full bg-slate-800 border-none rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-green-500 outline-none" />
                  <input required type="tel" placeholder="WhatsApp (com DDD)" className="w-full bg-slate-800 border-none rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-green-500 outline-none" />

                  <select className="w-full bg-slate-800 border-none rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-green-500 outline-none appearance-none">
                    <option>Combo Elo (Todas as Ferramentas)</option>
                    <option>Somente Solar Manager</option>
                    <option>Somente ReembolsarApp</option>
                    <option>Lista de Espera SolarVision IA</option>
                  </select>

                  <button type="submit" className="w-full py-5 orange-bg text-white rounded-xl font-black text-xl hover:bg-orange-600 shadow-xl shadow-green-500/20 transition-all">Começar Transformação</button>
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
            {/* LOGO FOOTER */}
            <div className="flex items-center text-[24px] font-[700] text-[#1f2023] logo-font mt-1">
              <Image src="/logo-elo-sem-fundo.png" alt="Logo" width={70} height={70} />
            </div>
          </div>
          <div className="flex justify-center space-x-8 mb-8 text-sm font-bold text-slate-500">
            <a href="#" className="hover:text-green-500 transition">Privacidade</a>
            <a href="#" className="hover:text-green-500 transition">Termos</a>
            <a href="#" className="hover:text-green-500 transition">LinkedIn</a>
          </div>
          <p className="text-slate-500 text-[10px] tracking-widest font-black uppercase">© 2024 ELO TECNOLOGIA. FEITO PARA QUEM MOVE O MERCADO SOLAR.</p>
        </div>
      </footer>
    </div>
  );
}