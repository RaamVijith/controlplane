import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const avatars = [
  { src: "https://github.com/shadcn.png", alt: "@shadcn" },
  { src: "https://github.com/shadcn.png", alt: "@shadcn" },
  { src: "https://github.com/shadcn.png", alt: "@shadcn" },
  { src: "https://github.com/shadcn.png", alt: "@shadcn" },
  { src: "https://github.com/shadcn.png", alt: "@shadcn" },
  { src: "https://github.com/shadcn.png", alt: "@shadcn" },
];

const AvatarGroup = () => {
  return (
    <div className="relative h-12">
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className="absolute top-0"
          style={{ transform: `translateX(${index * 15}px)` }}
        >
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage src={avatar.src} alt={avatar.alt} />
            <AvatarFallback>{avatar.alt.charAt(1)}</AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
