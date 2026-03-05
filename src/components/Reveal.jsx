import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

export function FadeUp({ children, delay = 0, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeIn({ children, delay = 0, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerContainer({ children, delay = 0, className = "", ...props }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.08,
                        delayChildren: delay,
                    },
                },
            }}
            style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = "" }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
            }}
            style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * Component that transitions from grayscale to color on scroll
 */
export function ScrollImage({ src, alt, className = "", imgClassName = "" }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const grayscaleAmount = useTransform(scrollYProgress, [0.2, 1.0], [100, 0]);
    const scaleValue = useTransform(scrollYProgress, [0.2, 1.0], [0.97, 1.04]);
    const filter = useMotionTemplate`grayscale(${grayscaleAmount}%)`;

    return (
        <div ref={ref} className={`${className} bg-transparent`}>
            <motion.img
                src={src}
                alt={alt}
                style={{
                    filter,
                    scale: scaleValue,
                }}
                className={`${imgClassName} block`}
            />
        </div>
    );
}
