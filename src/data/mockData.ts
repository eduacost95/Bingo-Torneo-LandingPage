import { PointRule, FAQItem, BingoCardData } from '../types';

export const POINT_RULES: PointRule[] = [
  {
    id: 'linea',
    name: 'LÍNEA',
    points: 50,
    description: 'Cualquier línea horizontal, vertical o diagonal de 5 casillas completadas.',
    iconName: 'Rows',
    previewGrid: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [true, true, true, true, true],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ],
  },
  {
    id: 'esquinas',
    name: '4 ESQUINAS',
    points: 75,
    description: 'Completar los cuatro vértices exteriores de tu cartón de bingo.',
    iconName: 'Maximize2',
    previewGrid: [
      [true, false, false, false, true],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [true, false, false, false, true],
    ],
  },
  {
    id: 'carton_lleno',
    name: 'CARTÓN LLENO',
    points: 100,
    description: 'Completar las 24 casillas numeradas de tu cartón (el centro es gratis).',
    iconName: 'Grid',
    previewGrid: [
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ],
  },
];

export const MUNICIPIOS_GUAJIRA = [
  'Maicao',
  'Riohacha',
  'Uribia',
  'Manaure',
  'Albania',
  'Hato Nuevo',
  'Villanueva',
  'Fonseca',
  'Otro',
] as const;

export const BARRIOS_MAICAO = [
  'El Bosque',
  'San Martín',
  'Majupay',
  'Mareygua',
  'Centro',
  '20 de Julio',
  'Los Comuneros',
  'Pastrana',
  'Erika Beatriz',
  'El Carmen',
  'Santander',
  'Miraflores',
  'Simón Bolívar',
  'Alfonso López',
  'Otro sector de Maicao',
];

export const BARRIOS_RIOHACHA = [
  'Centro',
  'El Prado',
  'Coquivacoa',
  'Arriba',
  'Nuevo Horizonte',
  'Entrerríos',
  'Otro sector de Riohacha',
];

export const BARRIOS_URIBIA = [
  'Centro',
  'Aipiamana',
  'San José',
  'Eduardo Abuchaibe',
  'Otro sector de Uribia',
];

export const FAQS: FAQItem[] = [
  {
    question: '¿Tengo que pagar algo para participar?',
    answer: 'No, en lo absoluto. La inscripción y la entrega de tu cartón digital son 100% gratuitas. No se exige ninguna compra, depósito, recarga ni suscripción de pago. Es una actividad social de entretenimiento familiar.',
    highlight: '100% GRATIS',
  },
  {
    question: '¿Puedo ganar dinero en efectivo?',
    answer: 'No. En cumplimiento estricto de las leyes colombianas y las políticas de Meta, no se entrega dinero en efectivo bajo ninguna circunstancia. Los premios son únicamente en especie y bonos de mercado local (canastas de alimentos de primera necesidad y bonos para compras en supermercados de Maicao).',
    highlight: 'Premios en especie y bonos de mercado',
  },
  {
    question: '¿Cuántos cartones puedo tener?',
    answer: 'Únicamente un (1) cartón digital por persona mayor de 18 años por edición del torneo. El cartón cuenta con un código serial alfanumérico único e intransferible verificado con tu número de WhatsApp y cédula.',
    highlight: '1 cartón por persona',
  },
  {
    question: '¿Qué pasa si dos jugadores empatan en 500 puntos?',
    answer: 'Gana la posición quien haya validado y registrado primero su última figura ganadora en el chat oficial de la transmisión en vivo ante los moderadores del torneo.',
    highlight: 'Desempate por orden de registro en vivo',
  },
  {
    question: '¿Cuándo y cómo se transmiten los bingos en vivo?',
    answer: 'Las rondas del torneo se transmiten en directo los fines de semana en horario familiar a través de YouTube Live y Facebook Live. Recibirás el enlace directo y recordatorio a tu WhatsApp antes de iniciar.',
    highlight: 'Transmisiones abiertas en vivo',
  },
  {
    question: '¿Cómo y dónde se reclaman los premios en Maicao?',
    answer: 'Los ganadores del 1er, 2do y 3er puesto son citados en nuestro punto de entrega presencial en Maicao (o entrega coordinada en tienda aliada), presentando su cédula de ciudadanía original para firmar el acta de entrega transparente.',
    highlight: 'Entrega presencial con cédula',
  },
];

export const OFFICIAL_RULES_SECTIONS = [
  {
    id: 'organizador',
    title: '1. Organizador, Vigencia y Territorio',
    content: `El presente torneo es organizado por [Bingo Torneo Free - Entretenimiento Familiar Maicao] ("El Organizador"). 
El torneo se desarrollará durante la vigencia actual con rondas semanales comunicadas a los participantes registrados. 
Territorio de validez: Válido exclusivamente para personas naturales mayores de dieciocho (18) años domiciliadas en el municipio de Maicao y áreas adyacentes de Riohacha y Uribia, departamento de La Guajira, República de Colombia.`,
  },
  {
    id: 'naturaleza',
    title: '2. Naturaleza 100% Gratuita y Sin Apuesta',
    content: `Esta actividad es un evento de entretenimiento comunitario y social por acumulación de puntos, totalmente libre de apuestas. 
No se requiere compra de ningún producto, depósito ni cobro de derechos de participación. Los cartones son gratuitos, personales e intransferibles. 
Bajo ninguna circunstancia se aceptan pagos o se vende ventaja alguna en el juego.`,
  },
  {
    id: 'mecanica',
    title: '3. Mecánica del Torneo y Sistema de 500 Puntos',
    content: `Cada participante registrado recibe un cartón digital numerado con código de serie único. 
Durante las transmisiones en vivo se cantarán balotas al azar del 1 al 75. 
Puntajes por figura completada y validada en vivo:
• LÍNEA (horizontal, vertical o diagonal): 50 Puntos.
• 4 ESQUINAS: 75 Puntos.
• CARTÓN LLENO: 100 Puntos.
Los puntos se acumulan fecha tras fecha hasta alcanzar la meta de 500 puntos:
• 1er Puesto: Primer participante en acumular 500 puntos oficiales.
• 2do Puesto: Segundo participante en acumular 500 puntos oficiales.
• 3er Puesto: Tercer participante en acumular 500 puntos oficiales.`,
  },
  {
    id: 'premios',
    title: '4. Premiación en Especie y No Canjeabilidad',
    content: `Los premios consisten estrictamente en:
- 1er Puesto: Bono de mercado de $400.000 COP para compras en supermercado local aliado en Maicao + Canasta familiar con víveres de primera necesidad.
- 2do Puesto: Bono de mercado de $200.000 COP para compras de alimentos.
- 3er Puesto: Bono de cena familiar / recarga + Kit conmemorativo Bingo Torneo Free.
Ningún premio podrá ser canjeado por dinero en efectivo, cheques ni divisas. La entrega se realiza de forma presencial en Maicao previa exhibición de la cédula de ciudadanía original del titular registrado.`,
  },
  {
    id: 'datos',
    title: '5. Protección de Datos Personales (Ley 1581 de 2012)',
    content: `En cumplimiento de la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 de Colombia, el participante autoriza de manera previa, expresa e informada a [Bingo Torneo Free] para recolectar, almacenar y utilizar sus datos personales (nombre, teléfono celular, ubicación) con la finalidad exclusiva de gestionar la asignación de su cartón digital, coordinar la participación en el torneo y notificar eventuales premios. El titular podrá ejercer en cualquier momento sus derechos de consulta, actualización o revocatoria comunicándose a la línea oficial de atención.`,
  },
  {
    id: 'meta_disclaimer',
    title: '6. Deslinde de Responsabilidad de Meta (Facebook e Instagram)',
    content: `Esta promoción no está patrocinada, avalada, administrada ni asociada en modo alguno a Facebook ni a Instagram. Al participar, liberas completamente a Facebook e Instagram de toda responsabilidad. Entiendes que proporcionas tu información a Bingo Torneo Free y no a Meta. Facebook no asistirá en la administración de esta promoción y participas bajo tu propio riesgo.`,
  },
];

export function generateRandomBingoCard(name: string, city: string): BingoCardData {
  const serial = `BTF-${city.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  
  // Columns:
  // B: 1-15, I: 16-30, N: 31-45, G: 46-60, O: 61-75
  const getRandomUniqueNumbers = (min: number, max: number, count: number): number[] => {
    const pool: number[] = [];
    for (let i = min; i <= max; i++) pool.push(i);
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      result.push(pool.splice(idx, 1)[0]);
    }
    return result;
  };

  const colB = getRandomUniqueNumbers(1, 15, 5);
  const colI = getRandomUniqueNumbers(16, 30, 5);
  const colN = getRandomUniqueNumbers(31, 45, 5);
  const colG = getRandomUniqueNumbers(46, 60, 5);
  const colO = getRandomUniqueNumbers(61, 75, 5);

  const matrix: number[][] = [];
  for (let r = 0; r < 5; r++) {
    const row = [colB[r], colI[r], r === 2 ? 0 : colN[r], colG[r], colO[r]];
    matrix.push(row);
  }

  return {
    serialNumber: serial,
    playerName: name,
    playerCity: city,
    matrix,
    createdAt: new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };
}
