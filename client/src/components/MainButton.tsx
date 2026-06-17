import ButtonLoader from "./ButtonLoader";

const MainButton = ({ text, loading, ariaLabel }: { text: string; loading?: boolean, ariaLabel: string }) => {
  if (loading) {
    return (
      <button
        className="flex items-center justify-center md:text-lg  h-[50px] rounded-xl w-full sm:w-[170px] bg-hoverLinkColor border border-hoverLinkColor text-white transition-all duration-500 hover:rounded-[50px] gap-2"
        disabled
      >
        <p> {text} </p>
        <ButtonLoader />
      </button>
    );
  }

  return (
    <button
      className="flex items-center justify-center text-lg  h-[50px] rounded-xl w-full sm:w-[170px] bg-hoverLinkColor border border-hoverLinkColor text-white transition-all duration-500 hover:rounded-[50px] hover:bg-white hover:text-hoverLinkColor"
      type="submit"
      aria-label={ariaLabel}
    >
      {text}
    </button>
  );
};

export default MainButton;
