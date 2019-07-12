User.destroy_all
Job.destroy_all
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
alex = User.create(username: "fitz" , nickname:"Alex", goal:"Build this project!", scratchpad: "Testvalue here")
ana = User.create(username: "bananarama", nickname:"Ana", goal:"Find a job", scratchpad: "Testvalue here")
nate = User.create(username: "notoriousNTG" , nickname: "Nate", goal:"Find a job", scratchpad: "Testvalue here")

Job.create(company:"Nava", title:"Software Engineer - Remote", status:"watching", dream_job: true, listing_notes:"this job looks cool" ,description:"Responsibilities: Collaborate with the product team, government stakeholders, and other contractors to build new systems and make improvements to existing systems. Design and spec out major functionality. Participate in planning and breaking down requirements into tasks. Maintain production systems, handle on-call duties, and systematically debug and resolve issues when they occur. Review code and give feedback on technical specs. Make improvements by proposing new tools and practices.", source:"Google", url:"https://jobs.lever.co/nava/c280510a-e3ed-4b6c-b64f-8ce82801da2b", user: alex)

Job.create(company:"Flatiron School", title:"Software Engineering Coach", status:"watching", dream_job: false, listing_notes:"this job looks cool" ,description:"The goal of any teacher or coach is to drive outcomes. We are looking for people who LOVE TEACHING. We make it a mission to seek out teachers who can infect, infuse and inspire with passion, wisdom, positivity, and humor. They show students how to love what they do, and how to better love who they are.", source:"Flatiron Website", url:"https://wework.wd1.myworkdayjobs.com/en-US/FlatironSchool/job/Chicago-IL-United-States-of-America/Coach--Software-Engineering_JR-0033810", user: alex)

Job.create(company:"IBM", title:"Entry Level Software Engineer", status:"watching", dream_job: true, listing_notes:"this job looks cool" ,description:"Software Engineers work with Public Service clients, co-creating solutions to major real-world challenges confronting the federal, state, and local governments. Public Service Software Engineers utilize IBM’s industry leading practices, worldwide commercial experience, and IBM Research technologies to design, develop, and integrate solutions. Software Engineers help their clients leverage technologies, tools, techniques, and products to deliver superior services for their organization that are in compliance with strict security requirements. Software Engineers can work on various projects that involve the use of cutting edge technologies such as: analytics, application management/development/maintenance, Artificial Intelligence (AI), automation, big data, Blockchain, biometrics, cloud, cognitive & computing technologies, design thinking, DevOps, encryption, Internet of Things (IoT), machine learning, micro-services, mobile development, cyber security and privacy, service desk modernization, system integration & architecture, testing, virtualization, and web design.", source:"IBM Career Site", url:"https://careers.ibm.com/ShowJob/Id/550414/?lang=en", user: alex)

Task.create(activity:"Submit application", user:alex, job_id: 1, due_by:DateTime.new(2019,07,20), completed: false)
Task.create(activity:"Thank you note", user:alex, job_id: 1,due_by:DateTime.new(2019,07,21), completed: false)
Task.create(activity:"Follow up e-mail", user:alex, job_id: 1,due_by:DateTime.new(2019,07,02), completed:false)