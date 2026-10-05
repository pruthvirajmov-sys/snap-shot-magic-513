import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, type FormEvent, type MouseEvent } from "react";
import { ArrowUpRight, ArrowDown, Plus, X, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import clouds from "@/assets/clouds.jpg";
import { Nav, Badge } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal, SectionTitle, Placeholder } from "@/components/site/Reveal";
import { projects, pipeline, services, experience, howIWork, clients, links } from "@/lib/content";

const TITLE = "Pruthviraj Rajput — Content Producer & Social Media Strategist";
const DESC = "Pruthviraj Rajput is a content producer and social media strategist handling the content pipeline from strategy and scripting to production, editing and social media.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const repelX = typeof window === "undefined" ? 0 : ((pointer.x - window.innerWidth / 2) / window.innerWidth) * 56;
  const repelY = typeof window === "undefined" ? 0 : ((pointer.y - window.innerHeight / 2) / window.innerHeight) * 42;

  return (
    <div className="relative" onMouseMove={(e) => setPointer({ x: e.clientX, y: e.clientY })} onMouseLeave={() => setPointer({ x: 0, y: 0 })}>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden cloud-bg">
        <img
          src={clouds}
          alt=""
          aria-hidden
          width={1920}
          height={1088}
          className="h-full w-full object-cover opacity-70"
          style={{ transform: `translate(${-repelX}px, ${-repelY}px) scale(1.06)` }}
        />
      </div>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <Experience />
        <Twisted />
        <About />
        <HowIWork />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function SaturatingImage({ src, alt, wrapClass = "", imgClass = "" }: { src: string; alt: string; wrapClass?: string; imgClass?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: string; y: string } | null>(null);
  const update = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: `${((e.clientX - r.left) / r.width) * 100}%`, y: `${((e.clientY - r.top) / r.height) * 100}%` });
  };
  const mask = pos ? `radial-gradient(circle 170px at ${pos.x} ${pos.y}, black 35%, transparent 100%)` : "none";
  return (
    <div ref={ref} onMouseMove={update} onMouseLeave={() => setPos(null)} className={`relative ${wrapClass}`}>
      <img src={src} alt={alt} className={imgClass} />
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-300"
        style={{ WebkitMaskImage: mask, maskImage: mask, opacity: pos ? 1 : 0 }}
      />
    </div>
  );
}

function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl rounded-3xl border border-border bg-card/95 px-6 py-16 shadow-card md:px-14 md:py-24 ${className}`}>{children}</div>;
}

function Hero() {
  return (
    <section className="px-4 pt-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <h1 className="hero-slide-down relative z-10 px-4 pt-14 text-center text-[13vw] font-extrabold leading-[0.9] tracking-tight md:pt-16 md:text-[8.5rem]">
          <span className="text-outline block md:inline">PRUTHVIRAJ</span>{" "}
          <span className="block md:inline">RAJPUT</span>
        </h1>
        <div className="relative grid gap-8 px-6 pb-10 pt-6 md:grid-cols-[1fr_1.1fr_1fr] md:items-end md:px-12 md:pb-0">
          <div className="hero-slide-down order-2 md:order-1 md:pb-14" style={{ animationDelay: "0.1s" }}>
            <p className="text-2xl font-semibold uppercase leading-tight tracking-tight">Content Producer &<br />Social Media Strategist</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">I handle the entire content pipeline.<br /></p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-y-0.5">Let's Work <ArrowUpRight className="h-3.5 w-3.5" /></a>
              <a href="#work" className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-muted">View My Work <ArrowDown className="h-3.5 w-3.5" /></a>
            </div>
          </div>
          <SaturatingImage src="https://img.sanishtech.com/u/f6814816a283debaad54db5a750cf8d7.png" alt="Portrait of Prithvi" wrapClass="hero-fade-in order-1 -mt-10 md:order-2 md:z-20 md:-mt-44 md:origin-bottom md:scale-[1.3]" imgClass="w-full grayscale" />
          <div className="hero-slide-up order-3 flex flex-col gap-3 md:items-end md:pb-14" style={{ animationDelay: "0.15s" }}>
            <p className="max-w-[16rem] text-sm leading-relaxed text-muted-foreground md:text-right">From concept to distribution, I build and manage content around what each project actually needs.</p>
            <div className="hero-slide-up flex flex-wrap gap-2 md:justify-end" style={{ animationDelay: "0.25s" }}>
              <a href={links.instagram} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium shadow-pill"><Instagram className="h-3.5 w-3.5" />Instagram</a>
              <a href={links.whatsapp} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium shadow-pill"><MessageCircle className="h-3.5 w-3.5" />WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border bg-ink px-6 py-4 text-ink-foreground">
          <p className="label-mono flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            {["Strategy", "Script", "Shoot", "Edit", "Publish"].map((s, i) => (
              <span key={s} className="flex items-center gap-4">{s}{i < 4 && <span className="text-ink-muted">→</span>}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 px-4 py-10">
      <Shell>
        <Reveal><div className="text-center"><div className="inline-block text-left"><SectionTitle ghost="Portfolio">Selected Work</SectionTitle></div></div></Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 120}><ProjectCard p={p} /></Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal><SectionTitle>Services</SectionTitle></Reveal>
        <div className="mt-10">
          {services.map((s, i) => (
            <div key={s.t} className="group my-3 overflow-hidden rounded-xl border-b border-foreground/15 transition-all duration-500 hover:bg-ink hover:text-ink-foreground hover:shadow-card">
              <div className="flex w-full items-center gap-4 px-5 py-7 text-left md:px-8">
                <span className="text-xs font-medium text-muted-foreground transition-colors duration-500 group-hover:text-ink-muted">0{i + 1}</span>
                <span className="flex-1 text-2xl font-medium uppercase tracking-tight md:text-5xl">{s.t}</span>
                <ArrowUpRight className="h-6 w-6 shrink-0 text-muted-foreground transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink-foreground" />
              </div>
              <div className="grid max-h-0 grid-rows-[0fr] transition-all duration-500 group-hover:max-h-40 group-hover:grid-rows-[1fr]">
                <p className="min-h-0 max-w-md overflow-hidden px-5 pb-0 text-sm leading-relaxed text-ink-muted transition-colors duration-500 group-hover:text-ink-muted md:px-8 md:pl-[4.25rem]">
                  <span className="block pb-8">{s.d}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl rounded-3xl bg-ink px-6 py-16 text-ink-foreground shadow-card md:px-14 md:py-20">
        <Reveal><SectionTitle ghost="Experience" dark>Experience</SectionTitle></Reveal>
        <div className="mt-12">
          {experience.map((e) => (
            <Reveal key={e.title} className="grid gap-3 border-b border-ink-border py-8 md:grid-cols-[1.2fr_1.5fr_auto] md:gap-10">
              <div>
                <h3 className="font-semibold">{e.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{e.sub}</p>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">{e.d}</p>
              <p className="text-sm text-ink-muted md:text-right">{e.dates}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Twisted() {
  return (
    <section className="px-4 py-20">
      <Reveal className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.3fr]">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-sm">
          <img src="https://img.sanishtech.com/u/208d0a100edf78ed17566e3db087429c.png" alt="Twisted Media logo" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div>
          <p className="label-mono text-muted-foreground">/Also Building Twisted Media</p>
          <p className="mt-5 text-2xl font-medium leading-snug tracking-tight md:text-3xl">Alongside my independent work, I also run Twisted Media — a creative content agency helping brands with content, social media, advertising, branding and digital execution.</p>
          <a href={links.twisted} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-foreground px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-primary hover:text-primary-foreground">Visit Twisted Media <ArrowUpRight className="h-3.5 w-3.5" /></a>
        </div>
      </Reveal>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-24 px-4 py-10">
      <Shell>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionTitle>About</SectionTitle>
            <Placeholder label="[Add behind-the-scenes photo]" className="mt-10 aspect-[4/5] w-full rounded-2xl" />
          </Reveal>
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground md:pt-24">
            <p className="hero-slide-up text-2xl font-medium leading-snug tracking-tight text-foreground" style={{ animationDelay: "0.08s" }}>I'm a content producer and social media strategist focused on turning ideas into content that actually gets used, published and seen.</p>
            <p className="hero-slide-up" style={{ animationDelay: "0.16s" }}>My work sits across the entire content pipeline — from developing ideas and writing scripts to handling production, editing videos and managing social media.</p>
            <p className="hero-slide-up" style={{ animationDelay: "0.24s" }}>I don't believe every project needs the same process. Sometimes a brand needs a script. Sometimes it needs a shoot. Sometimes it needs someone to take the entire content pipeline off its hands.</p>
            <p className="hero-slide-up font-semibold text-foreground" style={{ animationDelay: "0.32s" }}>I step in where I'm needed.</p>
            <p className="hero-slide-up text-base" style={{ animationDelay: "0.4s" }}>I also run Twisted Media, where I work on larger creative and social media projects.</p>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

function HowIWork() {
  return (
    <section id="how-i-work" className="scroll-mt-24 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal><SectionTitle>How I Work</SectionTitle></Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howIWork.map((h, i) => (
            <Reveal key={h.t} delay={i * 80} className="rounded-2xl border border-border bg-card/90 p-6 shadow-card transition-transform duration-500 hover:-translate-y-1">
              <span className="text-sm text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-10 text-lg font-semibold uppercase leading-tight tracking-tight">{h.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">"{h.d}"</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = ["name", "email", "company", "need", "budget", "message"].map((k) => `${k}: ${f.get(k) ?? ""}`).join("\n");
    window.location.href = `mailto:${links.emailAddress}?subject=${encodeURIComponent("Project inquiry from " + f.get("name"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const input = "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-foreground";
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-10 pb-20">
      <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card/70 px-6 py-16 backdrop-blur-md md:px-14 md:py-24">
        <Reveal className="text-center">
          <Badge />
          <h2 className="mt-6 text-4xl font-bold uppercase tracking-tight md:text-7xl">Have content in mind?</h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">Whether you need someone to develop the idea, write the script, handle production, edit the content or manage the social side — let's talk.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[[Instagram, "Instagram", links.instagram], [Linkedin, "LinkedIn", links.linkedin], [Mail, "Email", links.email], [MessageCircle, "WhatsApp", links.whatsapp]].map(([Icon, l, h]) => {
              const I = Icon as typeof Mail;
              return <a key={l as string} href={h as string} className="inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-sm font-medium shadow-pill transition-transform hover:-translate-y-0.5"><I className="h-4 w-4" />{l as string}</a>;
            })}
          </div>
        </Reveal>
        <Reveal>
          <form onSubmit={onSubmit} className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
            <input required name="name" placeholder="Name" className={input} />
            <input required type="email" name="email" placeholder="Email" className={input} />
            <input name="company" placeholder="Company / Brand" className={input} />
            <select name="need" defaultValue="" className={input}>
              <option value="" disabled>What do you need help with?</option>
              {services.map((s) => <option key={s.t}>{s.t}</option>)}
              <option>The full pipeline</option>
            </select>
            <input name="budget" placeholder="Budget / project range (optional)" className={`${input} sm:col-span-2`} />
            <textarea required name="message" rows={5} placeholder="Message" className={`${input} sm:col-span-2`} />
            <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">{sent ? "Opening your email app…" : "Replies usually within a couple of days."}</p>
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-y-0.5">Send Inquiry <ArrowUpRight className="h-3.5 w-3.5" /></button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
