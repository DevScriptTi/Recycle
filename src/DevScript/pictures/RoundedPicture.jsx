export const RoundedPicture = ({
  picture = "/public/assets/profile.jpg",
  size = "size-12",
}) => {
  return (
    <span className={`${size} rounded-full overflow-hidden object-cover`}>
      <img className="w-full" src={picture} alt="Profile picture" />
    </span>
  );
};
