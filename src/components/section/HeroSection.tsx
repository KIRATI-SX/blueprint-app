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
      <div
        className="mx-auto flex w-full max-w-[1200px] flex-col items-stretch gap-8 px-4 py-10 sm:px-6 lg:h-[672px] lg:flex-row lg:items-center lg:justify-center lg:gap-16 lg:px-[120px] lg:py-24"
      >
        <article className="w-full text-center text-brown-600 lg:max-w-[347px] lg:shrink-0 lg:text-right">
          <h1 className="headline-1 max-w-2xl pb-3 text-inherit max-lg:mx-auto sm:max-w-none lg:mx-0 lg:max-w-none lg:pb-4">
            {data.title}
          </h1>
          <p className="body-1 text-brown-400">{data.subtitle}</p>
        </article>

        <article className="shrink-0">
          <img
            src={data.imageUrl}
            alt={data.imageAlt}
            width={386}
            height={529}
            className="h-auto w-full max-w-[386px] max-h-[529px] rounded-2xl object-cover max-lg:mx-auto max-lg:aspect-386/529 lg:h-[529px] lg:w-[386px]"
            loading="lazy"
          />
        </article>

        <article className="w-full max-w-full text-left text-brown-600 lg:max-w-[360px] lg:shrink-0">
          <p className="body-2 pb-1 text-brown-400">{data.author.label}</p>
          <h2 className="headline-3 pb-3 text-inherit">{data.author.name}</h2>
          <div className="space-y-3 text-brown-500">
            <p className="body-1">{data.author.bio}</p>
            <p className="body-1">{data.author.extraBio}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
