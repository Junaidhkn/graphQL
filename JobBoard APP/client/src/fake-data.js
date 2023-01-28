const description = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, eum. Ea similique accusantium tenetur, dolor nulla nam ab eum libero ipsam saepe repellendus, natus ullam quidem. In aspernatur dolorum et architecto at provident voluptatum, nam inventore modi minima ratione, magni, facilis debitis ipsa harum. Impedit qui est magni dolor aut nesciunt ipsa vitae rerum natus doloribus in, quis deserunt sed id, soluta harum modi? Asperiores minus nam sint cumque illum? Eaque excepturi fugit illum veniam numquam. Neque nam fugit eaque? Neque fugit dicta voluptates quasi mollitia, officiis natus nulla quos earum laboriosam praesentium ad dolorem vitae? In voluptate voluptatum necessitatibus temporibus, consectetur explicabo itaque, harum reprehenderi"


export const companies = [
   {
      id: 'company1',
      name: 'Company A',
      description: description
   },
   {
      id: 'company2',
      name: 'Company B',
      description: description
   }
]


export const jobs = [
   {
      id: 'job1',
      title: 'Job 1',
      company: companies[0],
      description: description
   },
   {
      id: 'job2',
      title: 'Job 2',
      company: companies[1],
      description: description
   }
]