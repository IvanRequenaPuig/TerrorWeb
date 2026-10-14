
// data.js//
const K = [
    {
        id: 'jason',
        n: 'Jason Voorhees',
        c: '#7ea078',
        e: '13',
        l: 'Despertando en Crystal Lake...',
        t: 'El lago nunca devuelve lo que se lleva.',
        arma: 'Machete',
        lugar: 'Camp Crystal Lake',
        debut: 'Viernes 13 (1980)',

        bio: 'Un niño que se ahogó en un campamento y volvió, ya adulto y imparable, para vengarse de cada joven que pisa su bosque. En la primera película la asesina es su madre; él toma el relevo en la segunda.',

        pelis: [
            ['Viernes 13', 1980],
            ['Viernes 13 Parte 2', 1981],
            ['Freddy contra Jason', 2003]
        ],

        cur: [
            'La máscara de hockey aparece en la tercera película.',
            'Su fuerza sobrehumana y su cuerpo que no muere son su marca.'
        ],

        g: [4.3, 1500],
        r: [4.0, 1400]
    },

    {
        id: 'freddy',
        n: 'Freddy Krueger',
        c: '#d02a24',
        e: '1428',
        l: 'Cerrando los ojos... Elm Street te espera...',
        t: 'Si te duermes, ya es tarde.',
        arma: 'Guante de cuchillas',
        lugar: 'Elm Street y tus sueños',
        debut: 'Pesadilla en Elm Street (1984)',

        bio: 'Un asesino de niños linchado por los vecinos de Springwood que regresa en los sueños de sus hijos. Mata mientras duermes, y el humor negro es parte de su crueldad.',

        pelis: [
            ['Pesadilla en Elm Street', 1984],
            ['Los guerreros del sueño', 1987],
            ['La nueva pesadilla de Wes Craven', 1994]
        ],

        cur: [
            'Lo creó Wes Craven y lo interpretó Robert Englund.',
            'Su jersey rojo y verde se eligió por ser difícil de ver para el ojo humano.'
        ],

        g: [3.3, 1400],
        r: [4.4, 1500]
    },

    {
        id: 'art',
        n: 'Art el Payaso',
        c: '#eeeeee',
        e: 'Art',
        l: 'Se abre el telón. Hora del espectáculo...',
        t: 'No habla, no corre y nunca se detiene.',
        arma: 'Sierra, tijeras y lo que encuentre',
        lugar: 'Miles County y cualquier calle de noche',
        debut: 'All Hallows\' Eve (2013)',

        bio: 'Un payaso mudo y sonriente creado por Damien Leone. Disfruta torturando más que matando, y su crueldad explícita lo ha convertido en el rey del gore moderno.',

        pelis: [
            ['All Hallows\' Eve', 2013],
            ['Terrifier', 2016],
            ['Terrifier 2', 2022],
            ['Terrifier 3', 2024]
        ],

        cur: [
            'Nació en cortometrajes antes de llegar al cine.',
            'Terrifier 2 provocó desmayos en salas por su violencia.'
        ],

        g: [4.9, 1200],
        r: [4.2, 1100]
    },

    {
        id: 'michael',
        n: 'Michael Myers',
        c: '#c9c4b2',
        e: '31',
        l: 'Haddonfield, 31 de octubre. Apagando las luces...',
        t: 'Camina despacio porque sabe que llegará.',
        arma: 'Cuchillo de cocina',
        lugar: 'Haddonfield, Illinois',
        debut: 'Halloween (1978)',

        bio: 'A los seis años mató a su hermana. Quince años después escapa del psiquiátrico y vuelve a casa. Sin motivo ni palabras, es el mal en estado puro.',

        pelis: [
            ['Halloween', 1978],
            ['Halloween II', 1981],
            ['Halloween', 2018]
        ],

        cur: [
            'Lo dirigió John Carpenter, que también hizo la música.',
            'La máscara es en realidad una careta de otro personaje, pintada de blanco.'
        ],

        g: [2.9, 1300],
        r: [4.6, 1600]
    },

    {
        id: 'leatherface',
        n: 'Leatherface',
        c: '#b8863b',
        e: '74',
        l: 'Arrancando la motosierra...',
        t: 'Un hogar, una familia y una cena que no quieres ver.',
        arma: 'Motosierra',
        lugar: 'Texas rural',
        debut: 'La matanza de Texas (1974)',

        bio: 'Un hombre que lleva máscaras hechas con piel humana y vive con una familia caníbal. Su película de Tobe Hooper cambió el terror para siempre con un estilo casi documental.',

        pelis: [
            ['La matanza de Texas', 1974],
            ['La matanza de Texas 2', 1986],
            ['La matanza de Texas', 2003]
        ],

        cur: [
            'La película original apenas muestra sangre y aun así impactó a todo el mundo.',
            'Se rodó con pocos medios en un verano muy caluroso.'
        ],

        g: [4.0, 900],
        r: [4.7, 1200]
    },

    {
        id: 'ghostface',
        n: 'Ghostface',
        c: '#e7e2d8',
        e: '96',
        l: 'Sonando el teléfono...',
        t: '¿Cuál es tu película de terror favorita?',
        arma: 'Cuchillo Buck 120',
        lugar: 'Woodsboro',
        debut: 'Scream (1996)',

        bio: 'Una máscara que cualquiera puede llevar. Cada película esconde un asesino distinto que juega con las reglas del cine de terror, conoce las películas y llama por teléfono antes de atacar.',

        pelis: [
            ['Scream', 1996],
            ['Scream 2', 1997],
            ['Scream VI', 2023]
        ],

        cur: [
            'Lo dirigió Wes Craven, creador de Freddy.',
            'La máscara se encontró casi por casualidad en una casa de localizaciones.'
        ],

        g: [3.4, 1000],
        r: [3.8, 1100]
    }
];





const sl = s =>
    s.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');




   /* ===== En data.js, REEMPLAZA solo el array  const M = [ ... ];  por este =====
   p = imagen de la TARJETA (póster vertical)
   f = imagen de FONDO grande (horizontal)
   Cambia las rutas por las de tus imágenes. Son relativas a index.html. */

const M = [
    {
        t: 'Halloween', a: 1978, d: '1h31min', g: 'Slasher', k: 'michael',
        p: 'img/halloween.jpg',     
        f: 'img/halloweenhorizontal.jpg',           
        s: 'En la noche de Halloween, un asesino que escapó de un psiquiátrico vuelve al pueblo donde mató de niño y elige a una niñera como su próxima presa.'
    },
    {
        t: 'Viernes 13', a: 1980, d: '1h35min', g: 'Slasher', k: 'jason',
        p: 'img/viernes13.jpg',    
        f: 'img/viernes13horizontal.jpg',           
        s: 'Un grupo de monitores reabre un campamento maldito junto al lago. Alguien los vigila entre los árboles y no piensa dejar a nadie con vida.'
    },
    {
        t: 'Pesadilla en Elm Street', a: 1984, d: '1h31min', g: 'Sobrenatural', k: 'freddy',
        p: 'img/elmstreet.jpg',   
        f: 'img/elmhorizontal.jpg',           
        s: 'Varios adolescentes sueñan con el mismo hombre de guante metálico. Si mueren en el sueño, mueren de verdad, así que dormir es la peor idea.'
    },
    {
        t: 'Terrifier', a: 2016, d: '1h22min', g: 'Gore extremo', k: 'art',
        p: 'img/terrifier.jpg',    
        f: 'img/terrifierhorizontal.jpg',                
        s: 'En una Halloween nocturna, un payaso mudo acorrala a dos mujeres y convierte la noche en una pesadilla de crueldad explícita.'
    },
    {
        t: 'La matanza de Texas', a: 1974, d: '1h23min', g: 'Slasher', k: 'leatherface',
        p: 'img/matanzatexas.jpg',        
        f: 'img/texashorizontal.jpg',              
        s: 'Cinco amigos viajan por Texas y se detienen en una casa aislada. Allí vive una familia con costumbres que nadie debería conocer.'
    },
    {
        t: 'Scream', a: 1996, d: '1h51min', g: 'Slasher', k: 'ghostface',
        p: 'img/scream.png',        
        f: 'img/screamhorizontal.jpg',             
        s: 'Un asesino enmascarado llama por teléfono a sus víctimas y las somete a un juego mortal basado en las reglas del cine de terror.'
    }
];



const P = [
    {
        id: 'blumhouse',
        n: 'Blumhouse',
        c: '#8fb4ff',
        y: 2000,
        f: 'Jason Blum',
        k: 'Paranormal Activity, Insidious, Get Out',
        t: 'Poco dinero, mucho miedo y libertad total para los directores.',

        b: 'La productora de Jason Blum se hizo famosa con películas de muy bajo coste que acaban siendo enormes éxitos. Paranormal Activity fue el ejemplo perfecto: hecha con casi nada, se convirtió en un fenómeno mundial.',

        pelis: [
            ['Paranormal Activity', 2007],
            ['Insidious', 2010],
            ['Sinister', 2012],
            ['La noche de las bestias', 2013],
            ['Déjame salir', 2017],
            ['Halloween', 2018]
        ],

        cur: [
            'Su fórmula son presupuestos pequeños y creadores con mucha libertad.',
            'En 2024 se fusionó con Atomic Monster.'
        ]
    },

    {
        id: 'atomic-monster',
        n: 'Atomic Monster',
        c: '#ff6a2b',
        y: 2014,
        f: 'James Wan y Michael Clear',
        k: 'Malignant, M3GAN, La monja',
        t: 'El estudio de James Wan, el director que reinventó el terror moderno.',

        b: 'Fundada por el director James Wan y el productor Michael Clear, mezcla sustos clásicos con ideas nuevas y un estilo visual muy reconocible. Está detrás de varias películas del universo de El conjuro.',

        pelis: [
            ['La monja', 2018],
            ['Malignant', 2021],
            ['M3GAN', 2022]
        ],

        cur: [
            'James Wan también dirigió Saw e Insidious.',
            'En 2024 se unió a Blumhouse.'
        ]
    },

    {
        id: 'a24',
        n: 'A24',
        c: '#eeeeee',
        y: 2012,
        f: 'Daniel Katz, David Fenkel y John Hodges',
        k: 'Hereditary, Midsommar, The Witch',
        t: 'Terror de autor: más inquietante que escandaloso.',

        b: 'Una distribuidora independiente que apuesta por un terror más lento y psicológico. Sus películas buscan incomodar al espectador más que asustarlo de golpe.',

        pelis: [
            ['La bruja', 2015],
            ['Hereditary', 2018],
            ['Midsommar', 2019],
            ['X', 2022]
        ],

        cur: [
            'Es de las marcas favoritas de los cinéfilos.',
            'Su estilo ha creado el llamado terror elevado.'
        ]
    },

    {
        id: 'hammer',
        n: 'Hammer Film Productions',
        c: '#c3141c',
        y: 1934,
        f: 'William Hinds',
        k: 'Drácula, Frankenstein, La momia',
        t: 'La casa que puso color y sangre al terror clásico.',

        b: 'Productora británica que revivió a los monstruos clásicos con colores intensos y sangre en pantalla. Sus películas de los años cincuenta y sesenta cambiaron el género.',

        pelis: [
            ['La maldición de Frankenstein', 1957],
            ['Drácula', 1958],
            ['La momia', 1959]
        ],

        cur: [
            'Christopher Lee y Peter Cushing protagonizaron muchas de sus películas.',
            'Es una de las productoras de terror más antiguas del mundo.'
        ]
    },

    {
        id: 'new-line',
        n: 'New Line Cinema',
        c: '#e0a93b',
        y: 1967,
        f: 'Robert Shaye',
        k: 'Pesadilla en Elm Street, El conjuro, It',
        t: 'La casa que construyó Freddy.',

        b: 'Empezó siendo pequeña y creció gracias a Pesadilla en Elm Street, hasta el punto de que la llamaban "la casa que construyó Freddy". Hoy sigue haciendo grandes éxitos de terror.',

        pelis: [
            ['Pesadilla en Elm Street', 1984],
            ['Freddy contra Jason', 2003],
            ['El conjuro', 2013],
            ['It', 2017]
        ],

        cur: [
            'Freddy Krueger fue su gran mascota.',
            'Mantiene hoy el universo de El conjuro.'
        ]
    },


        {
        id: 'legendary',
        n: 'Legendary Pictures',
        c: '#c9a45c',
        y: 2000,
        f: 'Thomas Tull',
        k: 'Godzilla, Crimson Peak, Kong: La isla Calavera',
        t: 'Monstruos gigantes y terror gótico a lo grande.',

        b: 'Fundada por Thomas Tull, mezcla grandes presupuestos con criaturas colosales. Está detrás del MonsterVerse de Godzilla y Kong, y del terror gótico de Crimson Peak, dirigida por Guillermo del Toro.',

        pelis: [
            ['Pacific Rim', 2013],
            ['Godzilla', 2014],
            ['Crimson Peak', 2015],
            ['Kong: La isla Calavera', 2017]
        ],

        cur: [
            'Crimson Peak es su incursión más clara en el terror gótico.',
            'Su fuerte son los monstruos gigantes y las grandes producciones.'
        ]
    },
    
    {
        id: 'lionsgate',
        n: 'Lionsgate',
        c: '#b6954a',
        y: 1997,
        f: 'Frank Giustra',
        k: 'Saw',
        t: 'La distribuidora de la saga más sangrienta de las trampas.',

        b: 'Fundada en Canadá, llegó muy lejos gracias a Saw, una de las franquicias de terror más rentables del siglo. Se atrevió con un tipo de gore que otros estudios evitaban.',

        pelis: [
            ['Saw', 2004],
            ['Saw II', 2005],
            ['Saw X', 2023]
        ],

        cur: [
            'Saw se rodó con un presupuesto muy pequeño.',
            'Ha seguido sacando nuevas entregas durante años.'
        ]
    }
];