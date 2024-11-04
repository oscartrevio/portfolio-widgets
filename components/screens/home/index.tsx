import Header from "@/components/header";
import * as FadeIn from "@/components/motion/staggers/fade";
import Social from "@/components/ui/social";
import Book from "@/components/widgets/book";
import Folder from "@/components/widgets/folder";
import Location from "@/components/widgets/location";
import Movie from "@/components/widgets/movie";
import MusicPlayer from "@/components/widgets/music/music-player";
import Run from "@/components/widgets/run";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default async function Home() {
  const response = await fetch(
    "http://localhost:3000/api/spotify?mode=top-tracks",
    {
      cache: "no-store",
    },
  );
  const data = await response.json();
  console.log(data);

  return (
    // <FadeIn.Container>
    //   <FadeIn.Item>
    //     <Header />
    //   </FadeIn.Item>
    //   <Spacer />
    //   <FadeIn.Item>
    //     <AboutMe />
    //   </FadeIn.Item>
    //   <Spacer />
    //   <FadeIn.Item>
    //     <Posts category="thoughts" preview />
    //   </FadeIn.Item>
    //   <Spacer />
    //   <FadeIn.Item>
    //     <Posts category="craft" preview />
    //   </FadeIn.Item>
    //   <Spacer />
    //   <FadeIn.Item>
    //     <Footer />
    //   </FadeIn.Item>
    // </FadeIn.Container>
    <>
      <FadeIn.Container>
        <FadeIn.Item>
          <Header />
        </FadeIn.Item>
        <Spacer />
        <FadeIn.Item>
          <Location />
        </FadeIn.Item>
        <Spacer />
        <FadeIn.Item>
          <MusicPlayer />
        </FadeIn.Item>
        <Spacer />
        {/* <FadeIn.Item>
          <div className="flex gap-3">
            <Folder />
            <Folder />
          </div>
        </FadeIn.Item>
        <Spacer /> */}
        <FadeIn.Item>
          <div className="flex gap-3">
            <Book />
            <Movie />
          </div>
        </FadeIn.Item>
        <Spacer />
        <FadeIn.Item>
          <Run />
        </FadeIn.Item>
        <Spacer />
        <FadeIn.Item>
          <Social />
        </FadeIn.Item>
        <Spacer />
        {/* <div>{JSON.stringify(data)}</div> */}
      </FadeIn.Container>
    </>
  );
}
