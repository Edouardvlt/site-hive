
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
    Lock,
    Info,
    Ticket,
    Heart,
    CloudRain,
    Sun,
    Thermometer,
    Wind
} from 'lucide-react';

const FogOverlay = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
        <div className="fog-container">
            <div className="fog-img"></div>
            <div className="fog-img-2"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 z-10"></div>
    </div>
);

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        // Ferropolis Coordinates: 51.7566° N, 12.4480° E
        fetch('https://api.open-meteo.com/v1/forecast?latitude=51.7566&longitude=12.4480&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin')
            .then(res => res.json())
            .then(data => setWeather(data))
            .catch(err => console.error("Weather fetch failed", err));
    }, []);

    if (!weather) return null;

    const currentTemp = Math.round(weather.current.temperature_2m);
    const code = weather.current.weather_code;
    const isRain = code > 50; // Simple check

    return (
        <div className="flex items-center gap-4 px-3 py-1 bg-black/50 border border-zinc-800 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
                {isRain ? <CloudRain className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-yellow-500" />}
                <span className="text-white font-bold">{currentTemp}°C</span>
            </div>
            <div className="h-4 w-[1px] bg-zinc-700"></div>
            <div className="uppercase tracking-wide">FERROPOLIS</div>
        </div>
    );
};

const DynamicBackground = ({ selectedStageId, festivalStages }) => (
    <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {festivalStages.map((stage) => (
            <img
                key={stage.id}
                src={stage.bgImg}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${selectedStageId === stage.id ? 'opacity-100' : 'opacity-0'}`}
                alt=""
            />
        ))}
        <FogOverlay />
    </div>
);

const HiveDashboard = () => {
    const [activeTab, setActiveTab] = useState('squad');
    const [glitch, setGlitch] = useState(false);
    const BASE_URL = import.meta.env.BASE_URL;

    // --- USER STATE ---


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
            iconImg: `${BASE_URL}assets/hive/Icon_TechnoCastle.webp`,
            bgImg: `${BASE_URL}assets/hive/TechnoCastle_Backdrop_RedThresh.webp`,
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
            iconImg: `${BASE_URL}assets/hive/Icon_GrooveBeach.webp`,
            bgImg: `${BASE_URL}assets/hive/GrooveBeach_Backdrop_RedThresh.webp`,
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
            iconImg: `${BASE_URL}assets/hive/Icon_RageCage.webp`,
            bgImg: `${BASE_URL}assets/hive/RageCage_Backdrop_RedThresh.webp`,
            artists: [
                "VENDEX", "VIEZE ASBAK", "USH", "UNICORN ON K", "TOXIC MACHINERY", "TANJA MIJU", "THE PURGE B2B GRAVEDGR",
                "SUB ZERO PROJECT", "SLVL", "RAXELLER", "OMAKS", "O.B.I.", "NEEK", "MISS K8", "LIL TEXAS", "KRUELTY", "KO:LAB",
                "KARAH", "JOWI", "HADES", "ELMEFTI", "DUAL DAMAGE", "D-STURB", "DR. PEACOCK", "DR DONK", "DIMITRI K",
                "DIE GEBRÜDER BRETT", "ANIME"
            ]
        },
        {
            id: 'junkyard',
            name: "JUNKYARD AREA",
            iconImg: `${BASE_URL}assets/hive/Icon_Junkyard.webp`,
            bgImg: `${BASE_URL}assets/hive/Junkyard_Backdrop_RedThresh.webp`,
            artists: [
                "YANAMASTE", "ÜBERKIKZ", "UFO95 (LIVE)", "DJ STINGRAY 313", "QUELZA", "PHILIPPA PACHO", "MARRØN",
                "KINK", "FREDDY K", "FJAAK", "ELLI ACULA", "ELLEN ALLIEN", "CHLÄR", "BEN KLOCK", "ALARICO (LIVE)"
            ]
        },
        {
            id: 'sleepless',
            name: "SLEEPLESS FLOOR",
            iconImg: `${BASE_URL}assets/hive/Icon_Sleepless.webp`,
            bgImg: `${BASE_URL}assets/hive/Sleepless_Backdrop_RedThresh.webp`,
            artists: [
                "WILLIAM LUCK", "VORTEK'S", "TRITØNUS", "TRIPTYKH B2B OBSCURE SHAPE", "TARS", "STINNY STONE", "SALTYSIS",
                "PANTEROS666", "NIOTECH", "NIKOLINA", "NEON GRAVEYARD", "LUCIID B2B BEN TECHY", "LOLA CERISE", "LESSSS",
                "JOVYNN", "GEORGE RADSPORT", "ECZODIA", "DORUKSEN", "DJ TALLBOY", "DEXPHASE B2B SKRYPTION", "CALLUSH",
                "CADZOW", "AREA ØNE", "ALINA VORKO", "AFEM SYKO"
            ]
        },
        {
            id: 'bounce',
            name: "BOUNCE TEMPLE",
            iconImg: `${BASE_URL}assets/hive/Icon_BounceTemple.webp`,
            bgImg: `${BASE_URL}assets/hive/BounceTemple_Backdrop_RedThresh.webp`,
            artists: [
                "ZWILLING. B2B DJ ACHIM FEUERVOGEL FEAT. FRONSI", "WILDERICH B2B RIANA HOLLEY", "VAGABUND B2B FASTER HORSES", "THISO B2B IOSIO",
                "NOISE MAFIA B2B YASMIN REGISFORD", "JOKESONYOU B2B CARGO", "HITMILØW B2B THE MUFFIN MAN", "GIØ B2B DICE",
                "DVAID B2B DETOXX", "DJ DRECKISCH (LIVE)", "CARA ELIZABETH B2B DJ GUESTLIST", "ARMAN JOHN B2B KLING&KLANG",
                "ANTONYM B2B HUMAN ERROR", "3LEEZA B2B HANÀ"
            ]
        },
        {
            id: 'lagoon',
            name: "PSYLAGOON",
            iconImg: `${BASE_URL}assets/hive/Icon_Psylagoon.webp`,
            bgImg: `${BASE_URL}assets/hive/PsyLagoon_Backdrop_RedThresh.webp`,
            artists: [
                "VINI VICI", "SAJANKA", "RANJI", "POSSEBILITY", "PERKINS", "OMIKI", "LIQUID SOUL", "LIBRA", "KILLATK",
                "HENRIQUE CAMACHO", "HATIKWA", "GONZI", "GHOST RIDER", "FUNGUS FUNK", "FABIO FUSCO", "ELECTRIC UNIVERSE",
                "DRIP DROP", "CAPTAIN HOOK", "BLISS", "ANIMATO", "AVALON", "ACE VENTURA"
            ]
        },
        {
            id: 'strobe',
            name: "STROBE",
            iconImg: `${BASE_URL}assets/hive/Icon_Strobe.webp`,
            bgImg: `${BASE_URL}assets/hive/Strobe_Backdrop_RedThresh.webp`,
            artists: []
        },
        {
            id: 'forest',
            name: "DISCO FOREST",
            iconImg: `${BASE_URL}assets/hive/Icon_DiscoForest-2.webp`,
            bgImg: `${BASE_URL}assets/hive/DiscoForest_Backdrop_RedThresh.webp`,
            artists: []
        },
        {
            id: 'pirate',
            name: "PIRATE BAY",
            iconImg: `${BASE_URL}assets/hive/Icon_PirateBay.webp`,
            bgImg: `${BASE_URL}assets/hive/PirateBay_Backdrop.webp`,
            artists: []
        }
    ];

    const [squad, setSquad] = useState(initialSquad);
    const [personalGear, setPersonalGear] = useState(initialPersonalGear);
    const [groupGear, setGroupGear] = useState(initialGroupGear);
    const [artistVotes, setArtistVotes] = useState({}); // { artistName: [userId, userId...] }
    const [selectedStageId, setSelectedStageId] = useState(festivalStages[0].id);

    // Initialize currentUser from localStorage to prevent Modal flash
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('hive_last_user_id');
        return saved ? parseInt(saved) : null;
    });

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

            // Load Artist Votes
            const { data: votesData } = await supabase.from('hive_state').select('value').eq('key', 'hive_artist_votes').single();
            if (votesData) setArtistVotes(votesData.value);
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
        if (key === 'hive_artist_votes') setArtistVotes(value);

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
        if (currentUser !== id) return; // Permission Check
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

    // BODY SCROLL LOCK For Mobile Modal
    useEffect(() => {
        if (!currentUser) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [currentUser]);

    const assignGroupItem = (itemId, userId) => {
        const newGear = groupGear.map(i => i.id === itemId ? { ...i, assignedTo: userId } : i);
        setGroupGear(newGear);
        saveState('hive_group_gear', newGear);
    };

    const toggleArtistVote = (artistName) => {
        if (!currentUser) return;

        const currentVotes = artistVotes[artistName] || [];
        const hasVoted = currentVotes.includes(currentUser);

        let newVotes;
        if (hasVoted) {
            newVotes = currentVotes.filter(id => id !== currentUser);
        } else {
            newVotes = [...currentVotes, currentUser];
        }

        const newArtistVotes = { ...artistVotes, [artistName]: newVotes };
        setArtistVotes(newArtistVotes);
        saveState('hive_artist_votes', newArtistVotes);
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

    const SectionTitle = ({ title, icon: Icon, className = "" }) => (
        <div className={`flex items-center gap-4 mb-8 ${className}`}>
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

            {/* WELCOME MODAL */}
            {!currentUser && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto overscroll-contain">
                    <div className="min-h-full flex flex-col items-center justify-center p-4">
                        <div className="max-w-4xl w-full text-center space-y-12">
                            <div>
                                <AlertTriangle className="w-20 h-20 text-hive-red mx-auto mb-6 animate-pulse" />
                                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase glitch-text mb-4" data-text="IDENTIFICATION REQUISE">
                                    IDENTIFICATION REQUISE
                                </h1>
                                <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
                                    VEUILLEZ SÉLECTIONNER VOTRE PROFIL OPÉRATEUR
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {initialSquad.map(member => (
                                    <button
                                        key={member.id}
                                        onClick={() => setCurrentUser(member.id)}
                                        className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 p-6 hover:border-hive-red transition-all duration-300"
                                    >
                                        <div className="absolute inset-0 bg-hive-red/0 group-hover:bg-hive-red/10 transition-colors"></div>
                                        <div className="relative z-10 flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-black border border-zinc-700 flex items-center justify-center group-hover:border-hive-red transition-colors">
                                                <span className="font-mono text-xs text-zinc-500 group-hover:text-white">{member.code.split('-')[1]}</span>
                                            </div>
                                            <span className="text-xl font-bold text-white uppercase">{member.name}</span>
                                            <span className="text-[10px] text-zinc-500 font-mono">{member.role}</span>
                                        </div>
                                        {/* Corner Accents */}
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 group-hover:border-hive-red transition-colors"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700 group-hover:border-hive-red transition-colors"></div>
                                    </button>
                                ))}
                            </div>

                            <div className="text-xs text-zinc-600 font-mono">
                                SECURE CONNECTION ESTABLISHED // HIVE_SYS_V2.0
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === "logout") {
                                        setCurrentUser(null);
                                        localStorage.removeItem('hive_last_user_id');
                                        setPersonalGear(initialPersonalGear);
                                    } else {
                                        setCurrentUser(Number(val));
                                    }
                                }}
                            >
                                <option value="" disabled>SELECTIONNER NOM</option>
                                {initialSquad.map(member => (
                                    <option key={member.id} value={member.id} className="bg-black text-white">
                                        {member.name}
                                    </option>
                                ))}
                                <option value="logout" className="bg-red-900 text-white font-bold">-- DÉCONNEXION --</option>
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
                        <div className={`relative inline-block ${glitch ? 'animate-glitch-skew' : ''}`}>
                            <img
                                src={`${BASE_URL}assets/hive/HIVE26_HEADER2.webp`}
                                alt="HIVE"
                                className="w-full max-w-xl md:max-w-3xl mx-auto drop-shadow-[0_0_25px_rgba(220,38,38,0.4)]"
                            />
                        </div>
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
                        <WeatherWidget />
                    </div>
                </div>
            </header>

            {/* NAVIGATION */}
            <nav className="sticky top-0 z-30 bg-black/80 backdrop-blur border-b border-zinc-800">
                <div className="flex justify-start md:justify-center overflow-x-auto flex-nowrap hide-scrollbar">
                    {[
                        { id: 'squad', label: "GROUPE", icon: Users },
                        { id: 'gear', label: "MATÉRIEL", icon: CheckSquare },
                        { id: 'lineup', label: "LINEUP", icon: Music },
                        { id: 'infos', label: "INFOS", icon: Info },
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

                {/* TAB CONTENT: SQUAD */}
                {activeTab === 'squad' && (
                    <div className="animate-fadeIn relative">
                        <DynamicBackground selectedStageId={selectedStageId} festivalStages={festivalStages} />
                        <div className="relative z-10">
                            <SectionTitle title="L'ESCOUADE" icon={Users} />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                                disabled={currentUser !== member.id}
                                                className={`w-full py-2 px-4 flex items-center justify-between text-xs font-bold tracking-wider border transition-all
                                            ${currentUser !== member.id
                                                        ? 'opacity-30 cursor-not-allowed border-zinc-800 text-zinc-700'
                                                        : member.ticket
                                                            ? 'btn-cyber border-green-500 text-green-500 bg-green-500/10'
                                                            : 'btn-cyber border-zinc-700 text-zinc-600 hover:border-hive-red hover:text-white'
                                                    }`}
                                            >
                                                <span>{currentUser !== member.id ? 'VERROUILLÉ' : 'BILLET'}</span>
                                                <span className="font-mono">{member.ticket ? '[OK]' : '[MANQUANT]'}</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 w-full bg-white rounded-sm overflow-hidden border border-hive-red shadow-[0_0_20px_rgba(220,38,38,0.3)] relative group min-h-[500px]">
                                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                                    <h3 className="text-black font-black text-2xl uppercase tracking-widest drop-shadow-md">BILLETTERIE OFFICIELLE</h3>
                                </div>
                                <div className="absolute top-0 right-0 p-2 z-20">
                                    <a
                                        href="https://hive-festival.ticket.io/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-black text-white text-xs font-mono px-3 py-1 border border-hive-red hover:bg-hive-red hover:text-black transition-colors"
                                    >
                                        OUVRIR DANS UNE NOUVELLE FENÊTRE
                                    </a>
                                </div>
                                <iframe
                                    src="https://hive-festival.ticket.io/"
                                    className="w-full h-full border-0 min-h-[500px]"
                                    title="Hive Festival Tickets"
                                    allow="payment"
                                ></iframe>
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
                                    <br />
                                    <br />
                                    Bon les gars 🔥
                                    <br />
                                    <br />
                                    👉 Jeudi 18 juin, départ vers 20h direction le HIVE FESTIVAL
                                    <br />
                                    <br />
                                    Gros week-end en vue : 10 scènes, 57h de son non-stop, +300 artistes… autant dire qu’on va s’en mettre plein le buffet 🔊
                                    <br />
                                    <br />
                                    On part jeudi soir, et on repart le dimanche en fin de journée.
                                    <br />
                                    <br />
                                    Pour le budget :
                                    <br />
                                    🎟️ festival + camping = 257€
                                    <br />
                                    🚗 transport = 141€
                                    <br />
                                    🍻 alcool = 50€
                                    <br />
                                    <br />
                                    💸 Comptez environ 448€ par personne, tout compris
                                    <br />
                                    La colère ça va être incroyable ! 🔥🔊🍺
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'gear' && (
                    <div className="animate-fadeIn relative">
                        <DynamicBackground selectedStageId={selectedStageId} festivalStages={festivalStages} />
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* PERSONAL LOADOUT */}
                            <div>
                                <SectionTitle title={currentUser ? `MATÉRIEL : ${initialSquad.find(s => s.id === currentUser)?.name || 'INCONNU'}` : "MATÉRIEL PERSO (SÉLECTIONNEZ VOTRE NOM)"} icon={ShieldAlert} className="mt-12 md:mt-0" />

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
                                                className={`flex flex-col p-3 border-l-2 transition-all 
                                            ${item.checked ? 'border-zinc-700 bg-zinc-900/30 text-zinc-600' : 'border-hive-red bg-black text-white'}
                                            `}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleGroupCheck(item.id)}>
                                                        <div className={`w-4 h-4 border flex items-center justify-center ${item.checked ? 'border-zinc-700' : 'border-hive-red'}`}>
                                                            {item.checked && <div className="w-2 h-2 bg-zinc-600"></div>}
                                                        </div>
                                                        <span className={`uppercase font-bold text-sm tracking-wider ${item.checked ? 'line-through' : ''}`}>{item.item}</span>
                                                    </div>
                                                    {item.critical && !item.checked && <Zap className="w-4 h-4 text-hive-red animate-pulse" />}
                                                </div>

                                                {/* ASSIGNEE SELECTOR */}
                                                <div className="flex items-center gap-2 pl-7">
                                                    <span className="text-[10px] text-zinc-500 font-mono uppercase">ASSIGNÉ À:</span>
                                                    <select
                                                        className="bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 uppercase px-1 py-0.5 outline-none hover:border-hive-red transition-colors"
                                                        value={item.assignedTo || ""}
                                                        onChange={(e) => assignGroupItem(item.id, e.target.value ? parseInt(e.target.value) : null)}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <option value="">-- PERSONNE --</option>
                                                        {squad.map(member => (
                                                            <option key={member.id} value={member.id}>{member.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'lineup' && (
                    <div className="animate-fadeIn relative">
                        {/* DYNAMIC BACKGROUND FOR LINEUP */}
                        <div className="fixed inset-0 z-0 pointer-events-none">
                            <div className="absolute inset-0 bg-black/40 z-10"></div>
                            {festivalStages.map((stage) => (
                                <img
                                    key={stage.id}
                                    src={stage.bgImg}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${selectedStageId === stage.id ? 'opacity-100' : 'opacity-0'}`}
                                    alt=""
                                />
                            ))}
                            <FogOverlay />
                        </div>

                        <SectionTitle title="LINE-UP & SCÈNES" icon={Music} className="relative z-20 mb-8" />

                        <div className="relative z-20 flex flex-col-reverse lg:flex-row gap-8 pb-8">
                            {/* Main Content (Artists) */}
                            <div className="flex-grow">
                                <div className="hive-border p-8 bg-black/60 backdrop-blur-md relative">

                                    <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-8 tracking-tighter glitch-text leading-none flex items-center gap-4 border-b border-hive-red/30 pb-4">
                                        <span className="text-hive-red">{festivalStages.find(s => s.id === selectedStageId)?.name || "SELECT STAGE"}</span>
                                    </h2>

                                    {/* ARTIST LIST OR LOCKED STATE */}
                                    {festivalStages.find(s => s.id === selectedStageId)?.artists.length > 0 ? (
                                        <div className="flex flex-wrap items-center align-middle content-start gap-x-3 gap-y-1 text-justify">
                                            {festivalStages.find(s => s.id === selectedStageId)?.artists.map((artist, idx, arr) => {
                                                const votes = artistVotes[artist] || [];
                                                const isVoted = votes.includes(currentUser);

                                                return (
                                                    <React.Fragment key={idx}>
                                                        <div className="inline-flex items-center gap-2 group/artist">
                                                            <span className="text-lg md:text-2xl font-black text-zinc-300 uppercase tracking-tight hover:text-white transition-all cursor-default leading-none">
                                                                {artist}
                                                            </span>
                                                            <button
                                                                onClick={() => toggleArtistVote(artist)}
                                                                className={`
                                                                flex items-center gap-1 transition-all duration-300
                                                                ${isVoted ? 'text-hive-red opacity-100 scale-110' : 'text-zinc-600 opacity-0 group-hover/artist:opacity-100 hover:text-hive-red hover:scale-110'}
                                                                ${!currentUser && 'pointer-events-none hidden'}
                                                            `}
                                                            >
                                                                <Heart className={`w-4 h-4 ${isVoted ? 'fill-hive-red' : ''}`} />
                                                                {votes.length > 0 && <span className="text-[10px] font-mono font-bold align-top">{votes.length}</span>}
                                                            </button>
                                                        </div>
                                                        {idx !== arr.length - 1 && (
                                                            <span className="text-hive-red font-black text-xl select-none">|</span>
                                                        )}
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        /* LOCKED / TBA STATE */
                                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                                            <div className="relative">
                                                <Lock className="w-24 h-24 text-zinc-800" />
                                                <Lock className="w-24 h-24 text-hive-red absolute top-0 left-0 animate-pulse opacity-50" />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-black text-white glitch-text" data-text="PHASE 2 LOCKED">PHASE 2 LOCKED</h3>
                                                <p className="font-mono text-zinc-500 tracking-widest mt-2 uppercase">Données cryptées // Accès restreint</p>
                                            </div>
                                            <div className="w-full max-w-md h-1 bg-zinc-900 mt-8 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-hive-red w-1/3 animate-[shimmer_2s_infinite_linear]"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Stage Selector */}
                            <div className="w-full lg:w-auto flex-shrink-0 flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar justify-start items-start lg:pl-4">
                                {festivalStages.map((stage) => (
                                    <button
                                        key={stage.id}
                                        onClick={() => setSelectedStageId(stage.id)}
                                        className={`
                                            flex-shrink-0 w-20 h-20 md:w-24 md:h-24 clip-hexagon flex items-center justify-center relative transition-all duration-300 group
                                            ${selectedStageId === stage.id ? 'bg-hive-red scale-110 z-10 drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]' : 'bg-zinc-900/80 hover:bg-zinc-800 hover:scale-105'}
                                        `}
                                    >
                                        <div className="absolute inset-[2px] bg-black clip-hexagon flex items-center justify-center overflow-hidden">
                                            {/* Icon Image */}
                                            <img
                                                src={stage.iconImg}
                                                alt={stage.name}
                                                className={`w-12 h-12 md:w-16 md:h-16 object-contain transition-all duration-300 ${selectedStageId === stage.id ? 'brightness-100' : 'brightness-50 group-hover:brightness-100 grayscale group-hover:grayscale-0'}`}
                                            />
                                        </div>
                                        {/* Label for TBA stages */}
                                        {stage.artists.length === 0 && (
                                            <div className="absolute -bottom-2 bg-black text-[9px] text-hive-red font-mono px-1 border border-hive-red">
                                                LOCKED
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'infos' && (
                    <div className="animate-fadeIn space-y-12 relative">
                        <DynamicBackground selectedStageId={selectedStageId} festivalStages={festivalStages} />
                        <div className="relative z-10 space-y-12">
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

                            <SectionTitle title="ÉTAPES DU VOYAGE" icon={MapPin} />

                            <div className="relative border-l-2 border-dashed border-zinc-800 ml-4 md:ml-20 space-y-16 my-12">
                                {[
                                    { date: "JEU 18 JUIN - 21:00", title: "DÉPART", desc: "Départ Pornic. Trajet de nuit via Paris.", color: "text-hive-red", active: true },
                                    { date: "TRANSIT", title: "FRONTIÈRE", desc: "Passage Allemagne. Attention aux contrôles.", color: "text-white", active: false },
                                    { date: "VEN 19 JUIN - 12:00", title: "ARRIVÉE", desc: "Arrivée Ferropolis. Installation du camp.", color: "text-white", active: false },
                                    { date: "VEN 19 JUIN - 15:00", title: "DÉBUT FESTIVAL", desc: "Ouverture des portes et début de la démolition.", color: "text-green-500", glow: true, active: false }
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
                                    { val: "2,900 KM", label: "DISTANCE TOTALE ALLER - RETOUR", icon: Truck },
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
                    </div>
                )}




            </main >

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
