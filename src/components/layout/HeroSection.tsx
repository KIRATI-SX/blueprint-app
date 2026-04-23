export type HeroAuthor = {
  label: string;
  name: string;
  bio: string;
  extraBio: string;
};

export type HeroSectionData = {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  author: HeroAuthor;
};

type HeroSectionProps = Readonly<{
  data?: HeroSectionData;
}>;

const defaultHeroData: HeroSectionData = {
  title: "Stay Informed, Stay Inspired",
  subtitle:
    "Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.",
  imageUrl:
    "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
  imageAlt: "Author smiling while holding a cat outdoors",
  author: {
    label: "-Author",
    name: "Thompson P.",
    bio: "I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.",
    extraBio:
      "When I'm not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.",
  },
};

export default function HeroSection({ data = defaultHeroData }: HeroSectionProps) {
  return (
    <section aria-label="Hero section" className="w-full">
      <section className="w-full flex flex-col items-center gap-15 py-12 lg:h-[672px] lg:flex-row lg:justify-center lg:px-[120px] lg:py-24">
        <article className="w-full max-w-[347px] text-center lg:text-left">
          <h1 className="headline-1 text-right pb-4 text-brown-600">
            {data.title}
          </h1>
          <p className="body-1 text-right text-brown-400">{data.subtitle}</p>
        </article>

        <article className="w-full max-w-[400px]">
          <img
            src={data.imageUrl}
            alt={data.imageAlt}
            className="h-[529px] w-[386px] rounded-2xl object-cover"
            loading="lazy"
          />
        </article>

        <article className="w-full max-w-[360px]">
          <p className="body-2 pb-1 text-brown-400">{data.author.label}</p>
          <h2 className="headline-3 pb-3 text-brown-600">{data.author.name}</h2>
          <p className="body-1 text-brown-500">{data.author.bio}</p>
          <br />
          <p className="body-1 text-brown-500">{data.author.extraBio}</p>
        </article>
      </section>
    </section>
  );
}
