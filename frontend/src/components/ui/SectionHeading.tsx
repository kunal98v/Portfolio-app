import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-14 max-w-2xl"
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
      {description && <p className="mt-4 text-muted leading-relaxed">{description}</p>}
    </motion.div>
  );
}
