import { z } from 'zod'


// Unidades da Federação
const opcoesDeCores = [
  'AMARELO', 'AZUL', 'BRANCO', 'CINZA', 'DOURADO', 'LARANJA', 'MARROM', 'PRATA', 'PRETO', 'ROSA', 'ROXO', 'VERDE', 'VERMELHO'
]
const currentYear = new Date().getFullYear()

const minSellingDate = new Date("2020-03-20")

const today = new Date()



const Car = z.object({
  brand: z.string()
    .trim()   // Retira eventuais espaços em branco das extremidades
    .min(1, { message: 'Minimo de 1 letras no campo brand' })
    .max(25, { message: 'Maximo de 25 letras no campo brand' }),

  model: z.string()
    .trim()   // Retira eventuais espaços em branco das extremidades
    .min(1, { message: 'Minimo de 1 letras no campo brand' })
    .max(25, { message: 'Maximo de 25 letras no campo brand' }),


    // Nao sabia se queria que mantiesse as cores Como maiusculas no enum enquanto no CarsForms so tem a primeira letra, mas como estava escrito exatamente no enunciado deixei
    // Tive que pesquisar uma formar de fazer isso da certo e achei o pipe que pega o valor tranformado e faz uma noma validadacao se eu entendi bem
  color: z.string()
  .toUpperCase()
  .pipe(
    z.enum(opcoesDeCores, {
      message: 'Opcao de cor invalida'
    })
  ),


  year_manufacture: z.number()
    .int("O ano deve ser um número inteiro.")
    .min(1960, { message: "Ano minimo 1960" })
    .max(currentYear, { message: `O ano nao pode ser maior que a data atual` }),

  imported: z.boolean({message: "O valor deve ser: True ou False"}),
  
  plates: z.string()
  .length(8, {message: "O valor deve ter exatamente 8 caracteres"}),

  selling_date: z.coerce.date()
  .min(minSellingDate, {message: "Data minima: 20/03/2020"})
  .max(today, {message: "Data nao pode ser posterior a hoje"})
  .nullish(),

  selling_price: z.coerce.number()
  .min(5000, {message:'Valor minimo de 5000'})
  .max(5000000, {message:"Valor minimo de 5000000"}),
})
export default Car