import Balancer from "react-wrap-balancer";
import { Container, Section } from "./ui/craft";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Hero() {
  return (
    <Section>
      <Container className="flex flex-col items-center text-center">
        <h1 className="font-archivoBlack leading-heroTitle mb-6 text-8xl md:mb-8">
          <Balancer>Jager</Balancer>
        </h1>
        <h1 className="!mb-0 text-3xl">
          <Balancer>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Balancer>
        </h1>
        <h3 className="text-muted-foreground text-xl">
          <Balancer>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </Balancer>
        </h3>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Link href="/">
            <Button variant="outline">Learn More</Button>
          </Link>
          <Button
            variant="gooeyRight"
            onClick={() => signIn("", { callbackUrl: "/dashboard" })}
          >
            Get Started
          </Button>
        </div>
      </Container>
    </Section>
  );
}
