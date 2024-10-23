import Header from "@/components/header";
import * as FadeIn from "@/components/motion/staggers/fade";
import Book from "@/components/widgets/book";
import Location from "@/components/widgets/location";
import Movie from "@/components/widgets/movie";
import MusicPlayer from "@/components/widgets/music/music-player";
import Run from "@/components/widgets/run";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default function Home() {
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
      </FadeIn.Container>
    </>
  );
}
