import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Maximize, 
  Compass, 
  Smartphone, 
  Activity, 
  Globe, 
  Navigation, 
  ChevronRight, 
  School,
  Building2,
  Library,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';

const SCENES = {
  gate: {
    title: 'Main Entrance Plaza',
    image: '/tour/gate.jpg',
    hotSpots: [
      {
        pitch: -5,
        yaw: 175,
        type: 'scene',
        text: 'Walk to Campus Hall',
        sceneId: 'hall',
        cssClass: 'nav-arrow-hotspot'
      }
    ]
  },
  hall: {
    title: 'Campus Center Hall',
    image: '/tour/hall1.jpg',
    hotSpots: [
      {
        pitch: -15,
        yaw: 10,
        type: 'scene',
        text: 'Return to Entrance',
        sceneId: 'gate',
        cssClass: 'nav-arrow-hotspot'
      },
      {
        pitch: -8,
        yaw: 130,
        type: 'scene',
        text: 'Enter Auditorium',
        sceneId: 'auditorium',
        cssClass: 'nav-arrow-hotspot'
      }
    ]
  },
  auditorium: {
    title: 'Grand Auditorium',
    image: '/tour/hall2.jpg',
    hotSpots: [
      {
        pitch: -15,
        yaw: -160,
        type: 'scene',
        text: 'Exit to Hall',
        sceneId: 'hall',
        cssClass: 'nav-arrow-hotspot'
      }
    ]
  }
};

const FEATURE_CARDS = [
  {
    title: 'Immersive 360° Vision',
    desc: 'High-fidelity panoramic experiences captured in stunning 8K resolution.',
    icon: <Globe className="w-5 h-5 text-teal-700" />
  },
  {
    title: 'Seamless Flow',
    desc: 'Intelligent hotspot system for intuitive movement across all campus sites.',
    icon: <Navigation className="w-5 h-5 text-teal-700" />
  },
  {
    title: 'Adaptive Interface',
    desc: 'A perfectly fluid experience designed for mobile, tablet, and desktop.',
    icon: <Layers className="w-5 h-5 text-teal-700" />
  },
  {
    title: 'Real-Time Insights',
    desc: 'Live telemetry and orientation data for an informed exploration.',
    icon: <Activity className="w-5 h-5 text-teal-700" />
  }
];

const VirtualTour = () => {
  const viewerRef = useRef(null);
  const pannellumContainerRef = useRef(null);
  const [activeScene, setActiveScene] = useState('gate');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initPannellum = () => {
      if (window.pannellum && pannellumContainerRef.current) {
        viewerRef.current = window.pannellum.viewer(pannellumContainerRef.current, {
          default: {
            firstScene: 'gate',
            sceneFadeDuration: 1200,
            autoLoad: true,
            compass: false,
            showControls: false,
          },
          scenes: {
            gate: {
              title: SCENES.gate.title,
              panorama: SCENES.gate.image,
              hotSpots: SCENES.gate.hotSpots.map(hs => ({
                ...hs,
                createTooltipFunc: (el, text) => el.setAttribute('data-text', text)
              }))
            },
            hall: {
              title: SCENES.hall.title,
              panorama: SCENES.hall.image,
              hotSpots: SCENES.hall.hotSpots.map(hs => ({
                ...hs,
                createTooltipFunc: (el, text) => el.setAttribute('data-text', text)
              }))
            },
            auditorium: {
              title: SCENES.auditorium.title,
              panorama: SCENES.auditorium.image,
              hotSpots: SCENES.auditorium.hotSpots.map(hs => ({
                ...hs,
                createTooltipFunc: (el, text) => el.setAttribute('data-text', text)
              }))
            }
          }
        });

        viewerRef.current.on('load', () => {
          setActiveScene(viewerRef.current.getScene());
          setIsLoading(false);
        });
      }
    };

    const timer = setTimeout(initPannellum, 100);
    return () => {
      clearTimeout(timer);
      if (viewerRef.current) viewerRef.current.destroy();
    };
  }, []);

  const handleSceneChange = (sceneId) => {
    if (viewerRef.current) {
      viewerRef.current.loadScene(sceneId);
      setActiveScene(sceneId);
    }
  };

  const toggleFullscreen = () => viewerRef.current && viewerRef.current.toggleFullscreen();
  const resetCompass = () => viewerRef.current && viewerRef.current.setYaw(0);

  return (
    <div className="min-h-screen mesh-gradient text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      
      {/* Refined Header - Stone & Teal */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/60 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-teal-800 rounded-lg md:rounded-xl flex items-center justify-center text-stone-50 font-serif italic text-lg md:text-2xl shadow-md">V</div>
            <div className="flex flex-col">
              <span className="font-black text-slate-900 text-xs md:text-sm tracking-tight uppercase leading-none">Institutional</span>
              <span className="text-[8px] md:text-[10px] font-bold text-teal-700 uppercase tracking-widest mt-1 leading-none">Digital Gateway</span>
            </div>
          </motion.div>
          
          <button className="bg-teal-700 text-stone-50 px-5 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-teal-800 transition-all shadow-lg shadow-teal-100">
            Apply 2026
          </button>
        </div>
      </nav>

      {/* Hero Section - Calm Neutral */}
      <section className="relative pt-32 pb-20 md:pt-56 md:pb-40 text-center px-4">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-stone-200/50 text-teal-800 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] border border-stone-300/50 mb-8 md:mb-12">
            <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" /> Accredited Digital Twin
          </div>
          <h1 className="text-4xl md:text-8xl font-serif text-slate-900 mb-8 leading-[1.1] tracking-tight px-2">
            A Higher Perspective <br className="hidden md:block"/> 
            <span className="italic font-normal text-teal-800">on Exploration.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-xl text-slate-600 mb-12 md:mb-16 font-medium leading-relaxed px-6">
            Step into our world-class campus through a sophisticated immersive experience. 
            Discover academic excellence in every pixel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-10">
            <button 
              onClick={() => document.getElementById('tour-viewer').scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-4 md:px-12 md:py-5 bg-slate-900 text-stone-50 font-black rounded-xl md:rounded-2xl uppercase tracking-widest text-[10px] hover:bg-teal-700 transition-all shadow-xl"
            >
              Begin Virtual Tour
            </button>
            <button className="w-full sm:w-auto px-10 py-4 md:px-12 md:py-5 bg-white text-slate-900 font-black rounded-xl md:rounded-2xl border border-stone-200 uppercase tracking-widest text-[10px] hover:bg-stone-50 transition-all">
              Request Info
            </button>
          </div>
        </motion.div>
      </section>

      {/* Main Tour Viewer - Balanced Sizing */}
      <section id="tour-viewer" className="py-16 md:py-32 relative bg-stone-100/50 border-y border-stone-200/40">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="mb-10 md:mb-16 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-slate-900 italic mb-2 md:mb-3">Campus Immersion</h2>
              <p className="text-[10px] md:text-xs font-black text-stone-400 uppercase tracking-[0.3em]">Institutional 360 Environment</p>
            </div>
            <div className="bg-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl flex items-center gap-4 shadow-sm border border-stone-200">
              <Zap className="w-4 h-4 text-teal-600" />
              <span className="text-[10px] md:text-xs font-black text-slate-700 uppercase tracking-widest">84 Viewers Online</span>
            </div>
          </div>

          <div className="relative p-1.5 md:p-3 bg-white rounded-[2.2rem] md:rounded-[3.5rem] shadow-2xl border border-stone-200 overflow-hidden">
            {/* Perfectly Sized HUD */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30 flex flex-col gap-2 md:gap-3">
              <button onClick={toggleFullscreen} className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center text-slate-800 shadow-lg border border-stone-200 hover:bg-teal-700 hover:text-stone-50 transition-all active:scale-90">
                <Maximize className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button onClick={resetCompass} className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center text-slate-800 shadow-lg border border-stone-200 hover:bg-teal-700 hover:text-stone-50 transition-all active:scale-90">
                <Compass className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 z-30 max-w-[85%]">
              <div className="bg-white/90 backdrop-blur-md px-5 py-3 md:px-8 md:py-5 rounded-2xl md:rounded-[2.5rem] shadow-xl border border-stone-200 flex items-center gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-700 rounded-full flex items-center justify-center text-stone-50 shadow-md flex-shrink-0">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[8px] md:text-[10px] font-black text-teal-800 uppercase tracking-widest mb-0.5">Location Hub</h4>
                  <p className="text-sm md:text-2xl font-serif italic text-slate-900 truncate leading-tight">{SCENES[activeScene].title}</p>
                </div>
              </div>
            </div>

            <div 
              ref={pannellumContainerRef}
              className="w-full aspect-square sm:aspect-video bg-stone-900 rounded-[1.8rem] md:rounded-[2.8rem] overflow-hidden"
            >
              <AnimatePresence>
                {isLoading && (
                  <motion.div exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900 z-40">
                    <div className="w-12 h-12 border-2 border-stone-800 border-t-teal-500 rounded-full animate-spin"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Balanced Nav Cards */}
          <div className="mt-10 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10">
            {Object.entries(SCENES).map(([id, scene]) => (
              <button
                key={id}
                onClick={() => handleSceneChange(id)}
                className={`group relative text-left p-6 md:p-10 rounded-[1.8rem] md:rounded-[3rem] transition-all duration-500 border ${
                  activeScene === id 
                    ? 'bg-slate-900 text-stone-50 border-slate-900 shadow-2xl scale-105' 
                    : 'bg-white text-slate-800 border-stone-200 hover:border-teal-200 hover:shadow-xl'
                }`}
              >
                <div className="flex justify-between items-center mb-6 md:mb-8 relative z-10">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-[1.5rem] flex items-center justify-center transition-all ${
                    activeScene === id ? 'bg-teal-600 text-stone-50' : 'bg-stone-50 text-teal-800'
                  }`}>
                    {id === 'gate' && <School className="w-6 h-6 md:w-8 md:h-8" />}
                    {id === 'hall' && <Building2 className="w-6 h-6 md:w-8 md:h-8" />}
                    {id === 'auditorium' && <Library className="w-6 h-6 md:w-8 md:h-8" />}
                  </div>
                  <ChevronRight className={`w-5 h-5 md:w-6 md:h-6 ${activeScene === id ? 'text-teal-500' : 'text-stone-200 group-hover:text-teal-400'} transition-all`} />
                </div>
                <div className="relative z-10">
                  <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-1 block ${activeScene === id ? 'text-teal-400' : 'text-stone-400'}`}>Volume 0{Object.keys(SCENES).indexOf(id) + 1}</span>
                  <h4 className="text-xl md:text-3xl font-serif italic">{scene.title.split(' ').slice(-1)}</h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid - Calm Contrast */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
            <div className="space-y-10 md:space-y-12">
              <div className="inline-block px-4 py-1.5 bg-stone-100 text-teal-800 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-stone-200">Our Capability</div>
              <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1] italic px-1">Sophisticated <br className="hidden md:block"/>Digital Interaction.</h2>
              <div className="grid gap-6 md:gap-8">
                {FEATURE_CARDS.map((item, i) => (
                  <div key={i} className="flex gap-6 md:gap-8 group">
                    <div className="w-1 md:w-1.5 h-16 bg-stone-100 group-hover:bg-teal-700 transition-all duration-500 rounded-full" />
                    <div>
                      <h4 className="text-base md:text-xl font-black text-slate-900 uppercase tracking-tighter mb-1 md:mb-2">{item.title}</h4>
                      <p className="text-sm md:text-lg text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-700/5 rounded-full blur-[100px]"></div>
              <div className="relative bg-stone-50 p-4 md:p-6 rounded-[3rem] md:rounded-[4rem] border border-stone-200 shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800" 
                  alt="campus" 
                  className="rounded-[2.5rem] md:rounded-[3.2rem] shadow-lg group-hover:scale-105 transition-all duration-1000"
                />
                <div className="mt-8 md:mt-12 flex justify-between items-center px-4 md:px-8">
                  <div>
                    <h5 className="text-xl md:text-3xl font-serif italic text-slate-900">Main Plaza</h5>
                    <p className="text-[9px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1 md:mt-2">Quad View Preview</p>
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-700 text-stone-50 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all">
                    <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Calm & Professional */}
      <section className="py-24 md:py-48 px-4 md:px-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="container mx-auto max-w-6xl bg-slate-900 rounded-[2.5rem] md:rounded-[5rem] p-12 md:p-32 text-center text-stone-50 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.1),transparent_70%)]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-serif mb-8 md:mb-12 italic leading-tight">Embark on your <br/> next academic chapter.</h2>
            <p className="text-slate-400 text-lg md:text-2xl mb-12 md:mb-20 max-w-2xl mx-auto font-medium">
              Join a distinguished community of learners and innovators. 
              Our 2026 admissions portal is now accepting early applications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
              <button className="w-full sm:w-auto px-12 md:px-16 py-5 md:py-6 bg-teal-600 text-stone-50 font-black rounded-xl md:rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-teal-500 transition-all shadow-xl hover:-translate-y-1">
                Apply Today
              </button>
              <button className="w-full sm:w-auto px-12 md:px-16 py-5 md:py-6 bg-white/5 text-stone-50 font-black rounded-xl md:rounded-2xl border border-white/10 uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all">
                Download Brochure
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="py-16 text-center border-t border-stone-200/50 bg-white">
        <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.6em]">
          © 2026 Institutional Digital Gateway • Legacy of Global Education
        </p>
      </footer>
    </div>
  );
};

export default VirtualTour;
