import './style.css'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { generateText, streamText } from 'ai'

const openrouter = createOpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY
})
const form = document.querySelector('#form');

form.addEventListener('submit', async e=>{
  e.preventDefault()

  const prompt = document.querySelector('#prompt').value;

    if(prompt.trim()===''){
      alert('la consulta no puede ir vacia')
      return
    }


    const result =  streamText({
        model: openrouter('google/gemini-2.0-flash-exp:free'),
        // model: openrouter('google/gemma-3n-e4b-it:free'),
        // model: openrouter('deepseek/deepseek-prover-v2:free'),
      //  model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),

        prompt: prompt,
    })
  

  for await  (const text of result.textStream ){
     console.log(text)
  }


})


