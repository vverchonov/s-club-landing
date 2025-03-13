import type { Metadata } from 'next'
import Vacancies from '../components/Vacancies'

export const metadata: Metadata = {
  title: 'Вакансії | S Club - Нічний клуб в Києві',
  description: 'Приєднуйтесь до команди найкращого нічного клубу Києва. Відкриті вакансії: танцівниці, бармени, хостес, офіціанти.',
  keywords: ['вакансії', 'робота в клубі', 'нічний клуб', 'Київ', 'танцівниці', 'бармени', 'хостес'],
}

export default function VacanciesPage() {
  return (
    <>
    
      <main className="">
        <Vacancies />
      </main>
 
    </>
  )
} 