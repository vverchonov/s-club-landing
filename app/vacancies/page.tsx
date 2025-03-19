import type { Metadata } from 'next'
import Vacancies from '../components/Vacancies'

export const metadata: Metadata = {
  title: 'Вакансії | Cherry Lips showbar - Нічний cтриптиз клуб в Ужгороді',
  description: 'Приєднуйтесь до команди найкращого нічного клубу Ужгорода. Відкриті вакансії: танцівниці, бармени, хостес, офіціанти.',
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