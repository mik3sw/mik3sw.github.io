import type { ComponentType } from 'react'
import { Button } from '@/components/ui/button'
import { PortfolioBentoGrid } from '../bento'

type Features = {
  icon: ComponentType
  title: string
  description: string
  cardBorderColor: string
  avatarTextColor: string
  avatarBgColor: string
}[]

const Features = ({ featuresList }: { featuresList: Features }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24 '>
      <div className='mx-auto md:w-[80%] lg:w-[80%] w-[90%]'>
        {/* Header */}
        <div className='mb-12 space-y-4 sm:mb-16 lg:mb-24 max-w-7xl m-auto'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Love to code, learn and experiment</h2>
          <p className='text-muted-foreground text-xl'>
           From front-end to back-end, I enjoy working across the entire stack to create seamless and efficient applications. My passion for learning drives me to stay updated with the latest technologies and best practices in the industry. I thrive on experimenting with new tools and frameworks, constantly seeking innovative solutions to complex problems. Since 2023 i started my path to learn ML and AI, building datasets and fine-funing LLMs.
          </p>
          <div className='flex gap-1 items-center'>
            <Button variant='outline' className='rounded-lg text-base shadow-none has-[>svg]:px-6 mr-2' size='lg' asChild>
            <a href='https://github.com/mik3sw' target="_blank" rel="noopener noreferrer">
              <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              Github
            </a>
          </Button>
          <Button variant='outline' className='rounded-lg text-base shadow-none has-[>svg]:px-6' size='lg' asChild>
            <a href='https://huggingface.co/mik3ml' target="_blank" rel="noopener noreferrer">
              <img src="/hf-logo.svg" alt="Huggingface Logo" className='w-5 h-5'></img>

              Huggingface
            </a>
          </Button>
          </div>
          
        </div>

        {/* <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {featuresList.map((features, index) => (
            <Card key={index} className={cn('shadow-none transition-colors duration-300', features.cardBorderColor)}>
              <CardContent>
                <Avatar className={cn('mb-6 size-10 rounded-md', features.avatarTextColor)}>
                  <AvatarFallback className={cn('rounded-md [&>svg]:size-6', features.avatarBgColor)}>
                    <features.icon />
                  </AvatarFallback>
                </Avatar>
                <h6 className='mb-2 text-lg font-semibold'>{features.title}</h6>
                <p className='text-muted-foreground'>{features.description}</p>
              </CardContent>
            </Card>
          ))}
        </div> */}
        {/* <FeaturesSectionDemo></FeaturesSectionDemo> */}
        <PortfolioBentoGrid></PortfolioBentoGrid>
      </div>
    </section>
  )
}

export default Features
