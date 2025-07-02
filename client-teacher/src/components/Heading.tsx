
const Heading = ( { title }: { title: string } ) => {
  return (
    <div className="text-3xl text-hoverLinkColor mb-3 font-medium text-center" > 
         {title}
     </div>
  )
}

export default Heading