import { Footer } from "@/components/footer";
import Header from "@/components/header";
import * as FadeIn from "@/components/motion/staggers/fade";
import { Posts } from "@/components/posts";
import AboutMe from "@/components/screens/home/markdown/about-me.mdx";
import Music from "@/components/widgets/music";

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
          <Music />
        </FadeIn.Item>
      </FadeIn.Container>
    </>
  );
}
