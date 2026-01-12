
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Import Supabase client
import {
    Users,
    CheckSquare,
    MapPin,
    AlertTriangle,
    Music,
    Tent,
    BatteryCharging,
    CreditCard,
    Truck,
    Clock,
    ShieldAlert,
    ChevronDown,
    ChevronUp,
    Terminal,
    Zap,
    UserCircle,
    Info
} from 'lucide-react';

const HiveDashboard = () => {
    const [activeTab, setActiveTab] = useState('squad');
    const [glitch, setGlitch] = useState(false);

    // --- USER STATE ---
    const [currentUser, setCurrentUser] = useState(null); // ID of currently selected user

    // --- DATA ---
    const initialSquad = [
        { id: 1, name: "Edouard", role: "Alcoolique numéro 1", ticket: true, paid: true, code: "MBR-01" },
        { id: 2, name: "Grégoire", role: "Alcoolique numéro 2", ticket: true, paid: true, code: "MBR- 02" },
        { id: 3, name: "Titouan", role: "Alcoolique numéro 3", ticket: false, paid: false, code: "MBR- 03" },
        { id: 4, name: "Nicolas", role: "Alcoolique numéro 4", ticket: false, paid: false, code: "MBR-04" },
        { id: 5, name: "Thibault", role: "Alcoolique numéro 5", ticket: true, paid: false, code: "MBR-05" },
        { id: 6, name: "Julien", role: "Alcoolique numéro 6", ticket: false, paid: false, code: "MBR-06" },
        { id: 7, name: "Plan", role: "Alcoolique numéro 7", ticket: true, paid: true, code: "MBR-07" },
        { id: 8, name: "Roman", role: "Alcoolique numéro 8", ticket: false, paid: false, code: "MBR-08" },
        { id: 9, name: "Antoine", role: "Alcoolique numéro 9", ticket: false, paid: false, code: "MBR-09" },
    ];

    const initialPersonalGear = [
        { id: 1, item: "Billet Festival (PDF + Wallet)", checked: false, critical: true, category: "DOCUMENTS" },
        { id: 2, item: "Passeport / CNI Valide", checked: false, critical: true, category: "DOCUMENTS" },
        { id: 3, item: "Sac de couchage", checked: false, category: "CAMPING" },
        { id: 4, item: "Matelas", checked: false, category: "CAMPING" },
        { id: 5, item: "Tente", checked: false, critical: true, category: "CAMPING" },
        { id: 16, item: "Coussin", checked: false, category: "CAMPING" },
        { id: 7, item: "Vêtements (Chaud/Froid)", checked: false, category: "MATOS & DIVERS" },
        { id: 6, item: "Batterie Externe", checked: false, critical: true, category: "MATOS & DIVERS" },
        { id: 10, item: "Casquette / Bob / Lunettes de soleil", checked: false, category: "MATOS & DIVERS" },
        { id: 9, item: "Cigarettes / Vapote", checked: false, category: "MATOS & DIVERS" },
        { id: 11, item: "Alcool / Eau", checked: false, category: "MATOS & DIVERS" },
        { id: 12, item: "Paille", checked: false, category: "MATOS & DIVERS" },
        { id: 8, item: "Kit Hygiène (Shampoing, Savon, Dentifrice, PQ)", checked: false, category: "HYGIÈNE" },
        { id: 13, item: "Serviette", checked: false, category: "HYGIÈNE" },
        { id: 14, item: "Capote", checked: false, category: "HYGIÈNE" },
        { id: 15, item: "Mouchoirs en Paquet", checked: false, category: "HYGIÈNE" },
    ];

    const initialGroupGear = [
        { id: 1, item: "Tonnelle 3x3m (Vital : Soleil)", checked: false, critical: true },
        { id: 2, item: "Enceinte Bluetooth", checked: false },
        { id: 3, item: "Chaises pliantes (8x)", checked: false },
        { id: 4, item: "Jerrycans d'eau (2x 10L)", checked: false },
        { id: 5, item: "Diable / Chariot", checked: false },
        { id: 6, item: "Glacière", checked: false },
        { id: 7, item: "Lampes Torches / Frontales", checked: false },
    ];

    // --- FESTIVAL DATA ---
    const festivalStages = [
        {
            id: 'castle',
            name: "TECHNO CASTLE",
            icon: "🏰",
            artists: [
                "SCHROTTHAGEN", "SARA LANDRY", "RESTRICTED", "PRADA2000 B2B SOMEWHEN", "ONLYNUMBERS", "OGUZ B2B SANTØS",
                "NOTMYTYPE", "NICOLAS JULIAN", "NICO MORENO B2B NOVAH", "KUKO (LIVE)", "KOBOSIL", "KLANGKUENSTLER",
                "KALTE LIEBE (LIVE)", "FANTASM B2B KLOFAMA", "IGDA", "I HATE MODELS", "HOLY PRIEST", "DYEN", "CLOUDY",
                "CHARLIE SPARKS B2B LEE ANN ROBERTS", "BYØRN B2B SHLØMO", "AZZLE 447 B2B UEBERREST", "AZYR", "ANGERFIST B2B CARV",
                "ALIGNMENT", "A.N.I."
            ]
        },
        {
            id: 'beach',
            name: "GROOVE BEACH",
            icon: "🌴",
            artists: [
                "TRANCEMASTER KRAUSE", "SPFDJ B2B ØTTA", "SOUTHSTAR", "SHOKI287", "SERAFINA", "PETERBLUE", "PEGASSI",
                "PART TIME KILLER", "PARAÇEK", "PAWLOWSKI", "ODYMEL", "MISCHLUFT", "MIKA HEGGEMANN B2B CLEOPARD2000",
                "MIJA B2B OLLIE LISHMAN", "L.ZWO", "KETTAMA", "FUTURE.666", "FUMI", "FUNK TRIBU", "FENRICK", "DJ HYPERDRIVE",
                "DJ CRINGEY B2B KIM SWIM", "DAVYBOI", "BAD BOOMBOX", "AEREA (LIVE)", "ADRIÁN MILLS", "6EURONEUNZIG (LIVE)", "2HOT2PLAY"
            ]
        },
        {
            id: 'cage',
            name: "RAGE CAGE",
            icon: "⛓️",
            artists: [
                "VENDEX", "VIEZE ASBAK", "USH", "UNICORN ON K", "TOXIC MACHINERY", "TANJA MIJU", "THE PURGE B2B GRAVEDGR",
                "SUB ZERO PROJECT", "SLVL", "RAXELLER", "OMAKS", "O.B.I.", "NEEK", "MISS K8", "LIL TEXAS", "KRUELTY", "KO:LAB",
                "KARAH", "JOWI", "HADES", "ELMEFTI", "DUAL DAMAGE", "D-STURB", "DR. PEACOCK", "DR DONK", "DIMITRI K",
                "DIE GEBRÜDER BRETT", "ANIME"
            ]
        },
        {
            id: 'junkyard',
            name: "JUNKYARD",
            icon: "🏗️",
            artists: [
                "YANAMASTE", "ÜBERKIKZ", "UFO95 (LIVE)", "DJ STINGRAY 313", "QUELZA", "PHILIPPA PACHO", "MARRØN",
                "KINK", "FREDDY K", "FJAAK", "ELLI ACULA", "ELLEN ALLIEN", "CHLÄR", "BEN KLOCK", "ALARICO (LIVE)"
            ]
        },
        {
            id: 'sleepless',
            name: "SLEEP LESS",
            icon: "👁️",
            artists: [
                "WILLIAM LUCK", "VORTEK'S", "TRITØNUS", "TRIPTYKH B2B OBSCURE SHAPE", "TARS", "STINNY STONE", "SALTYSIS",
                "PANTEROS666", "NIOTECH", "NIKOLINA", "NEON GRAVEYARD", "LUCIID B2B BEN TECHY", "LOLA CERISE", "LESSSS",
                "JOVYNN", "GEORGE RADSPORT", "ECZODIA", "DORUKSEN", "DJ TALLBOY", "DEXPHASE B2B SKRYPTION", "CALLUSH",
                "CADZOW", "AREA ØNE", "ALINA VORKO", "AFEM SYKO"
            ]
        },
        {
            id: 'temple',
            name: "BOUNCE TEMPLE",
            icon: "⛩️",
            artists: [
                "ZWILLING. B2B DJ ACHIM FEUERVOGEL", "WILDERICH B2B RIANA HOLLEY", "VAGABUND B2B FASTER HORSES", "THISO B2B IOSIO",
                "NOISE MAFIA B2B YASMIN REGISFORD", "JOKESONYOU B2B CARGO", "HITMILØW B2B THE MUFFIN MAN", "GIØ B2B DICE",
                "DVAID B2B DETOXX", "DJ DRECKISCH (LIVE)", "CARA ELIZABETH B2B DJ GUESTLIST", "ARMAN JOHN B2B KLING&KLANG",
                "ANTONYM B2B HUMAN ERROR", "3LEEZA B2B HANÀ"
            ]
        },
        {
            id: 'psy',
            name: "PSY LAGOON",
            icon: "🍄",
            artists: [
                "VINI VICI", "SAJANKA", "RANJI", "POSSEBILITY", "PERKINS", "OMIKI", "LIQUID SOUL", "LIBRA", "KILLATK",
                "HENRIQUE CAMACHO", "HATIKWA", "GONZI", "GHOST RIDER", "FUNGUS FUNK", "FABIO FUSCO", "ELECTRIC UNIVERSE",
                "DRIP DROP", "CAPTAIN HOOK", "BLISS", "ANIMATO", "AVALON", "ACE VENTURA"
            ]
        }
    ];

    const [squad, setSquad] = useState(initialSquad);
    const [personalGear, setPersonalGear] = useState(initialPersonalGear);
    const [groupGear, setGroupGear] = useState(initialGroupGear);
    const [selectedStageId, setSelectedStageId] = useState(festivalStages[0].id);

    // --- SUPABASE PERSISTENCE ---

    // 1. Initial Data Fetch & Global Subscription
    useEffect(() => {
        const fetchGlobalData = async () => {
            // Load Squad
            const { data: squadData } = await supabase.from('hive_state').select('value').eq('key', 'hive_squad').single();
            if (squadData) setSquad(squadData.value);

            // Load Group Gear
            const { data: groupData } = await supabase.from('hive_state').select('value').eq('key', 'hive_group_gear').single();
            if (groupData) setGroupGear(groupData.value);

            // Load Last Selected User (Local Preference)
            const lastUser = localStorage.getItem('hive_last_user_id');
            if (lastUser) setCurrentUser(parseInt(lastUser));
        };

        fetchGlobalData();

        // Subscribe to Realtime Changes
        const channel = supabase
            .channel('public:hive_state')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'hive_state' }, (payload) => handleRealtimeUpdate(payload))
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'hive_state' }, (payload) => handleRealtimeUpdate(payload))
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // 2. Realtime Update Handler
    const handleRealtimeUpdate = (payload) => {
        const { key, value } = payload.new;
        if (key === 'hive_squad') setSquad(value);
        if (key === 'hive_group_gear') setGroupGear(value);

        // Note: Personal gear updates handled via specific subscription in separate useEffect
    };

    // Re-bind subscription to handle currentUser changes correctly
    const currentUserRef = React.useRef(currentUser);
    useEffect(() => { currentUserRef.current = currentUser }, [currentUser]);

    useEffect(() => {
        const channel = supabase
            .channel('realtime_updates')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'hive_state' }, (payload) => {
                const { key, value } = payload.new;

                // Check if this update is for the currently viewed user
                if (key === `hive_user_${currentUserRef.current}_gear`) {
                    setPersonalGear(value);
                }
            })
            .subscribe();

        return () => { supabase.removeChannel(channel) };
    }, []);


    // 3. User Switch: Fetch Specific Gear
    useEffect(() => {
        const fetchUserGear = async () => {
            if (currentUser) {
                // Save preference locally
                localStorage.setItem('hive_last_user_id', currentUser);

                const { data } = await supabase.from('hive_state').select('value').eq('key', `hive_user_${currentUser}_gear`).single();
                if (data) {
                    setPersonalGear(data.value);
                } else {
                    // No data on server yet? Reset to default and SAVE it to init server
                    setPersonalGear(initialPersonalGear);
                }
            }
        };
        fetchUserGear();
    }, [currentUser]);


    // 4. Save Helper
    const saveState = async (key, value) => {
        // Optimistic Update is handled by SetState in handlers
        // Send to Supabase
        await supabase.from('hive_state').upsert({ key, value });
    };


    // --- ACTIONS ---

    const toggleTicket = (id) => {
        const newSquad = squad.map(p => p.id === id ? { ...p, ticket: !p.ticket } : p);
        setSquad(newSquad);
        saveState('hive_squad', newSquad);
    };

    const togglePersonalCheck = (id) => {
        if (!currentUser) return;
        const newGear = personalGear.map(i => i.id === id ? { ...i, checked: !i.checked } : i);
        setPersonalGear(newGear);
        saveState(`hive_user_${currentUser}_gear`, newGear);
    };

    const toggleGroupCheck = (id) => {
        const newGear = groupGear.map(i => i.id === id ? { ...i, checked: !i.checked } : i);
        setGroupGear(newGear);
        saveState('hive_group_gear', newGear);
    };

    // Glitch loop
    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 200);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // --- COMPONENTS ---

    const SectionTitle = ({ title, icon: Icon }) => (
        <div className="flex items-center gap-4 mb-8">
            <div className="bg-hive-red p-2 text-black skew-x-[-10deg]">
                <Icon className="w-6 h-6 skew-x-[10deg]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white glitch-text" data-text={title}>
                {title}
            </h2>
            <div className="flex-grow h-[1px] bg-gradient-to-r from-hive-red to-transparent ml-4"></div>
        </div>
    );

    const ProgressBar = ({ current, total }) => {
        const percent = Math.round((current / total) * 100);
        return (
            <div className="w-full bg-hive-gray h-6 border border-zinc-700 mt-2 relative">
                <div
                    className="h-full bg-hive-red transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${percent}%` }}
                >
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(45deg,rgba(0,0,0,.1) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.1) 50%,rgba(0,0,0,.1) 75%,transparent 75%,transparent)', backgroundSize: '10px 10px' }}></div>
                </div>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-white mix-blend-difference tracking-widest">
                    PROGRESSION : {percent}%
                </span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-hive-black text-zinc-300 font-hive selection:bg-hive-red selection:text-white relative pb-20">

            {/* FOG & EFFECTS */}
            <div className="fog-container">
                <div className="fog-img"></div>
                <div className="fog-img-2"></div>
            </div>
            <div className="fixed inset-0 pointer-events-none z-0 bg-[url('https://transparenttextures.com/patterns/dark-matter.png')] opacity-40"></div>

            {/* CONNECTION STATUS INDICATOR (Tiny) */}
            <div className="fixed bottom-2 right-2 z-50 text-[10px] font-mono text-zinc-600 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                CONNECTÉ
            </div>

            {/* HEADER */}
            <header className="relative z-20 border-b border-zinc-800 bg-hive-black/90 backdrop-blur-md">

                {/* USER SELECTOR */}
                <div className="absolute top-4 right-4 z-50">
                    <div className="relative group">
                        <div className="flex items-center gap-3 bg-black border border-hive-red px-4 py-2 cursor-pointer btn-cyber">
                            <UserCircle className="text-hive-red w-5 h-5" />
                            <select
                                className="bg-transparent text-white font-mono font-bold text-sm outline-none appearance-none uppercase tracking-wider cursor-pointer min-w-[150px]"
                                value={currentUser || ""}
                                onChange={(e) => setCurrentUser(Number(e.target.value))}
                            >
                                <option value="" disabled>SELECTIONNER NOM</option>
                                {initialSquad.map(member => (
                                    <option key={member.id} value={member.id} className="bg-black text-white">
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-hive-red" />
                        </div>
                    </div>
                </div>


                {/* MARQUEE */}
                <div className="bg-hive-red text-black text-xs font-bold font-mono py-1 overflow-hidden border-b border-red-900 marquee-container">
                    <div className="marquee-content uppercase tracking-[0.2em] whitespace-nowrap">
                         /// HIVE FESTIVAL 2026 /// FERROPOLIS ALLEMAGNE /// HIVE FESTIVAL 2026 /// FERROPOLIS ALLEMAGNE /// HIVE FESTIVAL 2026 /// FERROPOLIS ALLEMAGNE /// &nbsp;&nbsp;&nbsp; /// HIVE FESTIVAL 2026 /// FERROPOLIS ALLEMAGNE /// HIVE FESTIVAL 2026 /// FERROPOLIS ALLEMAGNE /// HIVE FESTIVAL 2026 /// FERROPOLIS ALLEMAGNE /// &nbsp;&nbsp;&nbsp;
                    </div>
                </div>

                <div className="p-6 md:p-12 flex flex-col items-center justify-center gap-6 relative mt-6 md:mt-0">
                    <div className="absolute top-0 left-0 p-4 hidden md:block">
                        <Terminal className="text-zinc-600 w-6 h-6" />
                    </div>

                    <div className="text-center">
                        <h1 className={`text-6xl md:text-9xl font-black text-white tracking-tighter uppercase glitch-text leading-none ${glitch ? 'text-hive-red' : ''}`} data-text="HIVE">
                            HIVE
                        </h1>
                        <div className="flex items-center justify-center gap-4 mt-2">
                            <span className="h-[2px] w-12 bg-hive-red"></span>
                            <span className="text-xl md:text-3xl font-bold tracking-[0.5em] text-zinc-400">2026</span>
                            <span className="h-[2px] w-12 bg-hive-red"></span>
                        </div>
                    </div>

                    <div className="flex gap-4 font-mono text-xs text-hive-red border border-zinc-800 p-2 bg-black/50">
                        <div className="flex items-center gap-2 px-2 border-r border-zinc-700">
                            <Clock className="w-4 h-4" />
                            <span>J-158</span>
                        </div>
                        <div className="flex items-center gap-2 px-2">
                            <MapPin className="w-4 h-4" />
                            <span>FERROPOLIS / DE</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* NAVIGATION */}
            <nav className="sticky top-0 z-30 bg-black/80 backdrop-blur border-b border-zinc-800">
                <div className="flex justify-start md:justify-center overflow-x-auto flex-nowrap hide-scrollbar">
                    {[
                        { id: 'squad', label: "GROUPE", icon: Users },
                        { id: 'gear', label: "MATÉRIEL", icon: CheckSquare },
                        { id: 'infos', label: "INFOS", icon: Info },
                        { id: 'lineup', label: "LINEUP", icon: Music },
                        { id: 'roadmap', label: "TRAJET", icon: MapPin },
                        { id: 'budget', label: "BUDGET", icon: CreditCard },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex-shrink-0 flex items-center justify-center gap-3 px-6 py-4 text-sm md:text-base font-bold uppercase tracking-widest transition-all
                                hover:bg-zinc-900 border-r border-zinc-800 last:border-r-0 relative overflow-hidden group
                                ${activeTab === tab.id ? 'text-hive-red bg-zinc-900' : 'text-zinc-500'}
                            `}
                        >
                            <span className={`absolute bottom-0 left-0 h-[2px] bg-hive-red transition-all duration-300 ${activeTab === tab.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            <tab.icon className={`w-4 h-4 transition-transform duration-300 ${activeTab === tab.id ? 'scale-125' : 'group-hover:scale-110'}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-12 min-h-[60vh]">

                {activeTab === 'squad' && (
                    <div className="animate-fadeIn">
                        <SectionTitle title="PARTICIPANTS" icon={Users} />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {squad.map((member) => (
                                <div key={member.id} className={`hive-border bg-black/80 p-6 flex flex-col gap-4 group hover:bg-zinc-900/40 transition-colors ${currentUser === member.id ? 'border-hive-red shadow-[0_0_15px_rgba(255,0,0,0.2)]' : ''}`}>
                                    <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-hive-red transition-colors">{member.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] bg-zinc-800 px-1 py-0.5 font-mono text-zinc-400">{member.code}</span>
                                                <span className="text-xs text-zinc-500 uppercase">{member.role}</span>
                                            </div>
                                        </div>
                                        <div className={`w-3 h-3 rounded-sm ${member.ticket ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 animate-pulse'}`}></div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            onClick={() => toggleTicket(member.id)}
                                            className={`w-full btn-cyber py-2 px-4 flex items-center justify-between text-xs font-bold tracking-wider border 
                                            ${member.ticket ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-zinc-700 text-zinc-600'}`}
                                        >
                                            <span>BILLET</span>
                                            <span className="font-mono">{member.ticket ? '[OK]' : '[MANQUANT]'}</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 border border-hive-red bg-hive-red/5 p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <AlertTriangle className="w-32 h-32 text-hive-red" />
                            </div>
                            <h3 className="text-hive-red text-2xl font-black uppercase mb-4 flex items-center gap-3">
                                <AlertTriangle className="w-8 h-8" />
                                INFORMATION IMPORTANTE
                            </h3>
                            <p className="text-zinc-300 max-w-2xl font-mono text-sm leading-relaxed">
                                GROSSE DEMOLITION EN VUE.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'gear' && (
                    <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* PERSONAL LOADOUT */}
                        <div>
                            <SectionTitle title={currentUser ? `MATÉRIEL : ${initialSquad.find(s => s.id === currentUser)?.name || 'INCONNU'}` : "MATÉRIEL PERSO (SÉLECTIONNEZ VOTRE NOM)"} icon={ShieldAlert} />

                            <div className={`glass-panel p-6 ${!currentUser ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                                <div className="flex justify-between items-end mb-6 font-mono text-xs">
                                    <span className="text-zinc-500">MATÉRIEL PRÊT</span>
                                    <span className="text-hive-red">{Math.round((personalGear.filter(i => i.checked).length / personalGear.length) * 100)}%</span>
                                </div>
                                <ProgressBar current={personalGear.filter(i => i.checked).length} total={personalGear.length} />

                                <div className="mt-8 space-y-8">
                                    {['DOCUMENTS', 'CAMPING', 'HYGIÈNE', 'MATOS & DIVERS'].map((category) => (
                                        <div key={category}>
                                            <h4 className="text-hive-red font-mono text-xs font-bold uppercase mb-3 border-b border-zinc-800 pb-1 px-1">
                                                {category}
                                            </h4>
                                            <div className="space-y-2">
                                                {personalGear.filter(i => i.category === category).map((item) => (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => togglePersonalCheck(item.id)}
                                                        className={`flex items-center justify-between p-3 border-l-2 transition-all cursor-pointer hover:pl-6
                                                        ${item.checked ? 'border-zinc-700 bg-zinc-900/30 text-zinc-600' : 'border-hive-red bg-black text-white hover:bg-zinc-900'}
                                                        `}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-4 h-4 border flex items-center justify-center ${item.checked ? 'border-zinc-700' : 'border-hive-red'}`}>
                                                                {item.checked && <div className="w-2 h-2 bg-zinc-600"></div>}
                                                            </div>
                                                            <span className={`uppercase font-bold text-sm tracking-wider ${item.checked ? 'line-through' : ''}`}>{item.item}</span>
                                                        </div>
                                                        {item.critical && !item.checked && <Zap className="w-4 h-4 text-hive-red animate-pulse" />}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {!currentUser && <p className="text-center text-red-500 font-mono text-xs mt-4 animate-pulse">Veuillez sélectionner votre nom pour voir votre liste.</p>}
                            </div>
                        </div>

                        {/* BASE LOADOUT */}
                        <div>
                            <SectionTitle title="MATÉRIEL COMMUN" icon={Tent} />

                            <div className="glass-panel p-6">
                                <div className="flex justify-between items-end mb-6 font-mono text-xs">
                                    <span className="text-zinc-500">MATÉRIEL PRÊT</span>
                                    <span className="text-hive-red">{Math.round((groupGear.filter(i => i.checked).length / groupGear.length) * 100)}%</span>
                                </div>
                                <ProgressBar current={groupGear.filter(i => i.checked).length} total={groupGear.length} />

                                <div className="mt-8 space-y-2">
                                    {groupGear.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => toggleGroupCheck(item.id)}
                                            className={`flex items-center justify-between p-3 border-l-2 transition-all cursor-pointer hover:pl-6
                                            ${item.checked ? 'border-zinc-700 bg-zinc-900/30 text-zinc-600' : 'border-hive-red bg-black text-white hover:bg-zinc-900'}
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 border flex items-center justify-center ${item.checked ? 'border-zinc-700' : 'border-hive-red'}`}>
                                                    {item.checked && <div className="w-2 h-2 bg-zinc-600"></div>}
                                                </div>
                                                <span className={`uppercase font-bold text-sm tracking-wider ${item.checked ? 'line-through' : ''}`}>{item.item}</span>
                                            </div>
                                            {item.critical && !item.checked && <Zap className="w-4 h-4 text-hive-red animate-pulse" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'lineup' && (
                    <div className="animate-fadeIn mb-32">
                        <SectionTitle title="LINE-UP & SCÈNES" icon={Music} />

                        <div className="grid grid-cols-1 gap-12">
                            {festivalStages.map((stage) => (
                                <div key={stage.id} className="relative">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-4xl">{stage.icon}</span>
                                        <div>
                                            <h3 className="text-3xl font-black uppercase text-hive-red tracking-widest leading-none">{stage.name}</h3>
                                            <div className="h-1 w-20 bg-zinc-800 mt-2"></div>
                                        </div>
                                    </div>

                                    <div className="hive-border p-8 bg-black/40 backdrop-blur-sm relative overflow-hidden group hover:bg-zinc-900/20 transition-all">
                                        {/* Background Decoration */}
                                        <div className="absolute top-0 right-0 p-32 bg-hive-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                        <div className="relative z-10 flex flex-wrap gap-x-6 gap-y-3">
                                            {stage.artists.map((artist, idx) => (
                                                <div key={idx} className="flex items-center gap-2 group-artist">
                                                    <span className="text-white font-bold text-lg md:text-xl uppercase tracking-tighter hover:text-hive-red transition-colors cursor-default">
                                                        {artist}
                                                    </span>
                                                    {idx !== stage.artists.length - 1 && (
                                                        <span className="text-zinc-700 font-mono text-sm">/</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {activeTab === 'roadmap' && (
                    <div className="animate-fadeIn">
                        <SectionTitle title="ÉTAPES DU VOYAGE" icon={MapPin} />

                        <div className="relative border-l-2 border-dashed border-zinc-800 ml-4 md:ml-20 space-y-16 my-12">
                            {[
                                { date: "JEU 18 JUIN - 21:00", title: "DÉPART", desc: "Départ Pornic. Trajet de nuit via Paris.", color: "text-hive-red", active: true },
                                { date: "TRANSIT", title: "FRONTIÈRE", desc: "Passage Allemagne. Attention aux contrôles.", color: "text-white", active: false },
                                { date: "VEN 19 JUIN - 12:00", title: "ARRIVÉE", desc: "Arrivée Ferropolis. Installation du camp.", color: "text-white", active: false },
                                { date: "VEN 19 JUIN - 15:00", title: "DÉBUT FESTIVAL", desc: "Ouverture des portes.", color: "text-green-500", glow: true, active: false }
                            ].map((step, i) => (
                                <div key={i} className="relative pl-12 md:pl-16 group">
                                    <div className={`absolute -left-[11px] top-0 w-6 h-6 bg-black border-4 ${step.active ? 'border-hive-red' : 'border-zinc-800'} transform group-hover:scale-125 transition-transform`}></div>

                                    <div className={`font-mono text-sm mb-1 ${step.color}`}>{step.date}</div>
                                    <h3 className="text-3xl md:text-5xl font-black uppercase text-white mb-4 group-hover:translate-x-2 transition-transform">{step.title}</h3>
                                    <p className="text-zinc-400 font-mono text-sm border-l-2 border-zinc-900 pl-4">{step.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 font-mono">
                            {[
                                { val: "2,900 KM", label: "DISTANCE TOTALE", icon: Truck },
                                { val: "12H 30M", label: "TEMPS TRAJET", icon: Clock },
                                { val: "255 L", label: "CARBURANT", icon: BatteryCharging }
                            ].map((stat, i) => (
                                <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 flex flex-col items-center justify-center hover:border-hive-red transition-colors group">
                                    <stat.icon className="w-8 h-8 text-zinc-600 mb-4 group-hover:text-hive-red" />
                                    <div className="text-4xl font-bold text-white mb-2">{stat.val}</div>
                                    <div className="text-[10px] tracking-widest text-zinc-500 uppercase">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'budget' && (
                    <div className="animate-fadeIn">
                        <SectionTitle title="BUDGET PRÉVISIONNEL" icon={CreditCard} />

                        <div className="hive-border p-1 bg-black/50 overflow-hidden">
                            <table className="w-full text-left font-mono">
                                <thead className="bg-zinc-900 text-xs uppercase text-zinc-500 tracking-wider">
                                    <tr>
                                        <th className="p-4">Dépense</th>
                                        <th className="p-4 text-right">Total Groupe</th>
                                        <th className="p-4 text-right text-hive-red">Par Personne</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800 text-sm">
                                    {[
                                        { l: "Tickets + Camping", t: "1,960", p: "257" },
                                        { l: "Transport (MiniBus)", t: "500", p: "63" },
                                        { l: "Carburant (Diesel)", t: "433", p: "54" },
                                        { l: "Péages / Vignettes", t: "230", p: "29" },
                                        { l: "Courses / Nourriture", t: "400", p: "50" },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-zinc-900/50 transition-colors">
                                            <td className="p-4 text-zinc-300">{row.l}</td>
                                            <td className="p-4 text-right text-zinc-400">{row.t} €</td>
                                            <td className="p-4 text-right font-bold text-white">{row.p} €</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-hive-red text-black font-bold text-lg">
                                        <td className="p-4 uppercase tracking-widest">Total</td>
                                        <td className="p-4 text-right">3,523 €</td>
                                        <td className="p-4 text-right">~440 €</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'infos' && (
                    <div className="animate-fadeIn space-y-12">
                        <div className="border border-hive-red bg-black p-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-hive-red/10 group-hover:bg-hive-red/20 transition-colors"></div>
                            <div className="relative z-10 text-center">
                                <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-4 glitch-text" data-text="GROSSE DÉMOLITION">
                                    GROSSE DÉMOLITION EN VUE
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                                    {[
                                        { val: "10", label: "SCÈNES" },
                                        { val: "57H", label: "DE SON NON-STOP" },
                                        { val: "300+", label: "ARTISTES" }
                                    ].map((stat, i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            <span className="text-5xl md:text-7xl font-black text-hive-red">{stat.val}</span>
                                            <span className="text-sm md:text-xl font-bold text-zinc-400 uppercase tracking-widest bg-black px-2 -mt-4 transform -skew-x-12">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="hive-border p-8 bg-zinc-900/30">
                                <SectionTitle title="CAMPING" icon={Tent} />
                                <div className="space-y-6 font-mono">
                                    <div>
                                        <div className="text-zinc-500 text-xs uppercase mb-1">OUVERTURE</div>
                                        <div className="text-2xl font-bold text-white">JEU 18 JUIN <span className="text-hive-red">14:00</span></div>
                                    </div>
                                    <div>
                                        <div className="text-zinc-500 text-xs uppercase mb-1">CLÔTURE</div>
                                        <div className="text-2xl font-bold text-white">LUN 22 JUIN <span className="text-hive-red">14:00</span></div>
                                    </div>
                                    <div className="text-xs text-zinc-500 pt-4 border-t border-zinc-800">
                                        * ACCÈS 24/24 PENDANT LE WEEKEND
                                    </div>
                                </div>
                            </div>

                            <div className="hive-border p-8 bg-zinc-900/30">
                                <SectionTitle title="FESTIVAL AREA" icon={Music} />
                                <div className="space-y-6 font-mono">
                                    <div>
                                        <div className="text-zinc-500 text-xs uppercase mb-1">OUVERTURE</div>
                                        <div className="text-2xl font-bold text-white">VEN 19 JUIN <span className="text-hive-red">11:00</span></div>
                                    </div>
                                    <div>
                                        <div className="text-zinc-500 text-xs uppercase mb-1">CLÔTURE SON</div>
                                        <div className="text-2xl font-bold text-white">DIM 21 JUIN <span className="text-hive-red">22:00</span></div>
                                    </div>
                                    <div className="text-xs text-zinc-500 pt-4 border-t border-zinc-800">
                                        * H57 (NON-STOP FRIDAY TO SUNDAY)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }


                {activeTab === 'lineup' && (
                    <div className="animate-fadeIn min-h-[60vh] hidden lg:block">
                        {/* Split Layout: Content (Left) - Nav (Right) */}
                        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16">

                            {/* LEFT: STAGE CONTENT */}
                            <div className="flex-1">
                                {festivalStages.map(stage => {
                                    if (stage.id !== selectedStageId) return null;
                                    return (
                                        <div key={stage.id} className="animate-fadeIn">
                                            <div className="flex items-center gap-4 mb-8 border-b-2 border-hive-red pb-4">
                                                <span className="text-4xl">{stage.icon}</span>
                                                <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase glitch-text" data-text={stage.name}>
                                                    {stage.name}
                                                </h2>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {stage.artists.map((artist, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="border border-zinc-800 bg-zinc-900/30 p-4 text-center group hover:bg-zinc-800 hover:border-hive-red transition-all cursor-crosshair relative overflow-hidden"
                                                    >
                                                        <div className="relative z-10 font-bold text-sm md:text-base tracking-wider text-zinc-300 group-hover:text-white">
                                                            {artist}
                                                        </div>
                                                        <div className="absolute inset-0 bg-hive-red/5 scale-0 group-hover:scale-100 transition-transform origin-bottom-right duration-300"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* RIGHT: STAGE SELECTOR (HEXAGONS) */}
                            <div className="w-full lg:w-1/3 flex flex-col items-center">
                                <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-6 w-full text-center border-b border-zinc-800 pb-2">
                                    SÉLECTIONNER SCÈNE
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {festivalStages.map((stage) => (
                                        <button
                                            key={stage.id}
                                            onClick={() => setSelectedStageId(stage.id)}
                                            className={`relative w-24 h-28 flex items-center justify-center transition-all duration-300 group focus:outline-none`}
                                            style={{
                                                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                                            }}
                                        >
                                            {/* Background & Border Simulation */}
                                            <div className={`absolute inset-0 transition-colors duration-300 ${selectedStageId === stage.id ? 'bg-hive-red' : 'bg-zinc-800 group-hover:bg-zinc-700'}`}></div>
                                            <div className={`absolute inset-[2px] transition-colors duration-300 ${selectedStageId === stage.id ? 'bg-black' : 'bg-black'}`}
                                                style={{
                                                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                                                }}
                                            ></div>

                                            {/* Content */}
                                            <div className="relative z-10 flex flex-col items-center gap-1">
                                                <span className="text-2xl">{stage.icon}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-8 text-center">
                                    <div className="text-4xl font-black text-white">10 STAGES</div>
                                    <div className="text-sm font-bold text-zinc-500 uppercase">57 HOURS MADNESS</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="relative z-10 border-t border-zinc-900 p-12 mt-12 text-center text-[10px] font-mono text-zinc-700 flex flex-col items-center gap-4">
                <p>HIVE // DASHBOARD V2</p>
                {/* <button
                    onClick={async () => {
                        if (confirm("ATTENTION : Cela va écraser les données du serveur avec les nouvelles données du code (Noms, Rôles, etc.). Continuer ?")) {
                            await supabase.from('hive_state').upsert({ key: 'hive_squad', value: initialSquad });
                            await supabase.from('hive_state').upsert({ key: 'hive_group_gear', value: initialGroupGear });
                            window.location.reload();
                        }
                    }}
                    className="text-red-900/50 hover:text-red-500 transition-colors uppercase tracking-widest text-[10px] border border-red-900/30 px-2 py-1"
                >
                    [ ADMIN: FORCE PUSH UPDATE ]
                </button> */}
            </footer>

        </div >
    );
};

export default HiveDashboard;
