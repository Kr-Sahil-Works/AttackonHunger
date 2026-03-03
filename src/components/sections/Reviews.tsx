import { motion, useMotionValue } from "framer-motion";
import { reviews, type Review } from "@/data/review";

type TiltCardProps = {
  review: Review;
  index: number;
};

function TiltCard({ review, index }: TiltCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateXValue = ((y - height / 2) / height) * -12;
    const rotateYValue = ((x - width / 2) / width) * 12;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative will-change-transform"
    >
      {/* subtle hover glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-40 transition duration-300 bg-linear-to-r from-red-500/20 via-orange-500/10 to-red-500/20 blur-sm" />

      {/* card */}
      <div className="relative h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:border-white/20">
        {/* quote */}
        <div className="absolute top-4 right-5 text-white/10 text-5xl font-bold">
          "
        </div>

        {/* user */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-12 h-12 rounded-full object-cover border border-white/20"
          />

          <div>
            <h3 className="text-white font-semibold">
              {review.name}
            </h3>

            <div className="text-yellow-400 text-sm tracking-wide">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
          </div>
        </div>

        {/* text */}
        <p className="text-gray-300 text-sm leading-relaxed">
          {review.text}
        </p>

        {/* bottom line */}
        <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
      </div>
    </motion.div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-24 px-6 bg-black overflow-hidden">
      {/* soft background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/2 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Food Warriors Say 🔥
          </h2>

          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Real spice lovers. Real reviews. Real damage.
          </p>
        </motion.div>

        {/* grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <TiltCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}