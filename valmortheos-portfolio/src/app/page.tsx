// Impor ThreeScene.tsx
import ThreeScene from '@/components/ui/ThreeScene';
import Image from 'next/image'; // Siap digunakan jika ada gambar profil atau logo proyek

// Komponen kecil untuk Section Title
const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-brand-blue relative pb-2
    after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0
    after:w-16 sm:after:w-24 after:h-1 after:bg-brand-blue after:rounded">
    {title}
  </h2>
);

// Komponen untuk kartu dengan efek glass
const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-brand-white bg-opacity-5 backdrop-blur-lg p-4 sm:p-6 rounded-xl border border-glass-edge shadow-2xl ${className}`}>
    {children}
  </div>
);

const SkillCategory = ({ title, skills }: { title: string, skills: string[] }) => (
  <div className="mb-6">
    <h4 className="text-xl font-semibold text-brand-blue mb-3">{title}</h4>
    <div className="flex flex-wrap gap-3">
      {skills.map(skill => (
        <span key={skill} className="bg-brand-blue bg-opacity-10 text-brand-blue text-sm font-medium px-4 py-2 rounded-full border border-brand-blue hover:bg-opacity-20 transition-colors">
          {skill}
        </span>
      ))}
    </div>
  </div>
);


export default function Home() {
  const projects = [
    {
      title: "Platform E-commerce Interaktif",
      description: "Sebuah platform e-commerce modern dengan visualisasi produk 3D menggunakan Three.js, dibangun dengan Next.js untuk performa server-side rendering dan Tailwind CSS untuk UI yang responsif.",
      tech: ["Next.js", "React", "Three.js", "Tailwind CSS", "Stripe API"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Dasbor Analitik Data Real-time",
      description: "Aplikasi web dasbor yang menampilkan data analitik secara real-time, menggunakan React untuk antarmuka dinamis dan Chart.js untuk visualisasi data. Dilengkapi autentikasi dan manajemen pengguna.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Chart.js", "JWT"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Aplikasi Mobile Panduan Wisata AR",
      description: "Sebuah aplikasi mobile cross-platform (dibangun dengan React Native) yang menyediakan panduan wisata interaktif dengan fitur Augmented Reality untuk menampilkan informasi tempat menarik.",
      tech: ["React Native", "Firebase", "ARKit/ARCore", "Geolocation API"],
      demoUrl: "#",
      githubUrl: "#"
    }
  ];

  const frontendSkills = ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Tailwind CSS", "Redux", "Vue.js (Basic)"];
  const backendSkills = ["Node.js", "Express.js", "Python (Flask/Django - Basic)", "MongoDB", "PostgreSQL", "RESTful APIs", "GraphQL (Basic)"];
  const toolsAndOthers = ["Git & GitHub", "Docker", "CI/CD (GitHub Actions)", "Jest & React Testing Library", "Three.js", "Firebase", "Webpack", "Figma (Basic)"];


  return (
    <div className="space-y-20 sm:space-y-28 md:space-y-36"> {/* Penyesuaian jarak antar seksi */}
      {/* Hero Section */}
      <section id="hero" className="min-h-[calc(100vh-150px)] sm:min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center py-16 sm:py-20 relative overflow-hidden">
        <ThreeScene />
        <div className="relative z-10 bg-brand-black bg-opacity-40 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-2xl border border-glass-edge shadow-xl max-w-3xl">
          {/* Bisa ditambahkan logo atau gambar profil di sini jika ada */}
          {/* <Image src="/path-to-your-image.png" alt="Valmortheos" width={150} height={150} className="mx-auto mb-6 rounded-full" /> */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4">
            <span className="text-brand-white">Valmortheos</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8">
            Merancang dan Mengembangkan Solusi Web Inovatif dengan Estetika Modern dan Performa Optimal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#projects"
              className="bg-brand-blue text-brand-black font-semibold px-6 sm:px-8 py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300 text-md sm:text-lg shadow-md hover:shadow-lg"
            >
              Lihat Karya Saya
            </a>
            <a
              href="#contact"
              className="border-2 border-brand-blue text-brand-white font-semibold px-6 sm:px-8 py-3 rounded-lg hover:bg-brand-blue hover:text-brand-black transition-all duration-300 text-md sm:text-lg shadow-md hover:shadow-lg"
            >
              Mari Berdiskusi
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16">
        <SectionTitle title="Profil Saya" />
        <GlassCard className="max-w-4xl mx-auto text-left sm:text-center"> {/* text-left untuk mobile, center untuk desktop */}
          <p className="text-md sm:text-lg text-gray-300 leading-relaxed mb-4">
            Selamat datang di portofolio saya! Saya Valmortheos, seorang Full-Stack Web Developer dengan hasrat mendalam untuk menciptakan pengalaman digital yang tidak hanya fungsional, tetapi juga intuitif dan memukau secara visual. Saya mengkhususkan diri dalam ekosistem JavaScript, khususnya React dan Next.js untuk frontend, serta Node.js untuk backend.
          </p>
          <p className="text-md sm:text-lg text-gray-300 leading-relaxed mb-4">
            Filosofi pengembangan saya berpusat pada <strong className="text-brand-blue">kode yang bersih, arsitektur yang scalable, dan desain yang berpusat pada pengguna</strong>. Saya percaya bahwa detail kecil membuat perbedaan besar, dan saya selalu berusaha untuk melampaui ekspektasi dalam setiap proyek yang saya kerjakan. Keingintahuan saya terhadap teknologi baru, seperti Three.js untuk grafis 3D interaktif, mendorong saya untuk terus belajar dan berinovasi.
          </p>
          <p className="text-md sm:text-lg text-gray-300 leading-relaxed">
            Di luar baris kode, saya adalah seorang pemikir analitis, problem solver yang gigih, dan komunikator yang efektif, siap untuk berkolaborasi dalam tim untuk mewujudkan ide-ide brilian menjadi kenyataan.
          </p>
        </GlassCard>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16">
        <SectionTitle title="Proyek Pilihan" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <GlassCard key={index} className="flex flex-col h-full"> {/* flex flex-col h-full untuk tinggi kartu yang sama */}
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-brand-blue">{project.title}</h3>
              <p className="text-gray-300 mb-4 text-xs sm:text-sm flex-grow">{project.description}</p> {/* flex-grow untuk deskripsi */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Teknologi:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-md">{t}</span>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-glass-edge space-x-3"> {/* mt-auto untuk mendorong link ke bawah */}
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline text-sm sm:text-base font-medium">
                  Live Demo
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline text-sm sm:text-base font-medium">
                  Source Code
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-16">
        <SectionTitle title="Keahlian Teknis" />
        <GlassCard className="max-w-5xl mx-auto p-6 sm:p-8">
          <SkillCategory title="Frontend Development" skills={frontendSkills} />
          <SkillCategory title="Backend Development" skills={backendSkills} />
          <SkillCategory title="Tools & Lainnya" skills={toolsAndOthers} />
        </GlassCard>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16">
        <SectionTitle title="Terhubung Dengan Saya" />
        <GlassCard className="max-w-xl mx-auto text-center">
          <p className="text-md sm:text-lg text-gray-300 mb-6 leading-relaxed">
            Saya selalu terbuka untuk diskusi mengenai proyek baru, peluang kolaborasi, atau sekadar bertukar pikiran tentang teknologi.
            Jangan ragu untuk mengirimkan saya email.
          </p>
          <div className="text-center">
            <a
              href="mailto:valmortheos.dev@example.com" // Ganti dengan email Anda
              className="bg-brand-blue text-brand-black font-semibold px-8 py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300 text-lg inline-block shadow-md hover:shadow-lg"
            >
              Kirim Pesan Email
            </a>
          </div>
          {/* Pertimbangkan menambahkan link ke LinkedIn atau GitHub di sini */}
          <div className="mt-8 text-gray-400">
            <p>Anda juga bisa menemukan saya di:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">GitHub</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">LinkedIn</a>
              {/* Tambahkan platform lain jika ada */}
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
