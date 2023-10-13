function NewHome() {
  return (
    <>
      <div className="partition-container | container min-h-screen">
        <div className="left-partition | overflow-hidden">
          <div className="background-image | w-full h-full bg-[url('https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-center bg-cover"></div>
        </div>
        <div className="right-partition | overflow-hidden">
          <div className="background-image | w-full h-full bg-[url('https://images.pexels.com/photos/417430/pexels-photo-417430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-center bg-cover"></div>
        </div>
      </div>
    </>
  );
}

export default NewHome;
