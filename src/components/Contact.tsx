// src/components/Contact.tsx
import React, { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import { Button } from './Button'
import { fadeIn, slideUp } from '../lib/motionVariants'
import { sectionPadding } from '../lib/styles'

interface ContactProps {
  /**
   * When true, the component renders a simplified layout without the outer
   * <section> wrapper. This is useful when embedding the Contact content
   * inside another component (e.g. the hero card). When false (default),
   * the component behaves as a standalone page section with its own
   * padding and scroll snapping.
   */
  embedded?: boolean
}

const Contact = ({ embedded = false }: ContactProps) => {
  const { t } = useTranslation()
  const [status, setStatus] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Utilizamos then/catch para detectar correctamente el estado de la respuesta
    emailjs
      .sendForm(
        'service_tj955yp',     // tu ID de servicio real
        'template_7holsnr',    // tu ID de plantilla real
        e.currentTarget,
        'EbRCVBg5U0qok1sK4'    // tu public key real
      )
      .then(() => {
        setStatus(t('contact_success'))
        e.currentTarget.reset()
      })
      .catch(() => {
        setStatus(t('contact_error'))
      })
  }

  // Contenido común para modo embebido y modo standalone
  const content = (
    <>
      {/* Encabezado */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={embedded ? undefined : 'min-[1100px]:w-1/3'}
      >
        <h2 className={embedded ? 'text-3xl font-bold mb-4' : 'text-4xl font-bold mb-8'}>
          {t('contact_title')}
        </h2>
      </motion.div>

      {/* Formulario */}
      <motion.form
        onSubmit={handleSubmit}
        className={
          embedded
            ? 'max-w-full flex flex-col gap-4'
            : 'max-w-xl mx-auto flex flex-col gap-4 min-[1100px]:flex-1'
        }
        variants={slideUp(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        aria-label={t('contact_form_aria') || t('contact_title')}
      >
        {/* Nombre */}
        <label htmlFor="contact-name" className="sr-only">
          {t('contact_name')}
        </label>
        <input
          id="contact-name"
          type="text"
          name="user_name" // coincide con {{user_name}} en la plantilla de EmailJS
          placeholder={t('contact_name')}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
          aria-required="true"
        />

        {/* Correo electrónico */}
        <label htmlFor="contact-email" className="sr-only">
          {t('contact_email')}
        </label>
        <input
          id="contact-email"
          type="email"
          name="user_email" // coincide con {{user_email}} en la plantilla de EmailJS
          placeholder={t('contact_email')}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
          aria-required="true"
        />

        {/* Asunto (opcional) */}
        <label htmlFor="contact-subject" className="sr-only">
          {t('contact_subject')}
        </label>
        <input
          id="contact-subject"
          type="text"
          name="subject" // coincide con {{subject}} en la plantilla si decides incluirlo
          placeholder={t('contact_subject')}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Mensaje */}
        <label htmlFor="contact-message" className="sr-only">
          {t('contact_message')}
        </label>
        <textarea
          id="contact-message"
          name="message" // coincide con {{message}} en la plantilla
          placeholder={t('contact_message')}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          rows={5}
          required
          aria-required="true"
        />

        {/* Botón de envío */}
        <Button type="submit" aria-label={t('contact_button')}>
          {t('contact_button')}
        </Button>

        {/* Mensaje de estado */}
        {status && (
          <p className="mt-2 text-center" aria-live="polite">
            {status}
          </p>
        )}
      </motion.form>
    </>
  )

  // Cuando está embebido, retorna solo el contenido en un contenedor sencillo
  if (embedded) {
    return (
      <div
        className="mt-8 flex flex-col gap-6 text-left"
        style={{
          margin: '15px',
        }}
      >
        {content}
      </div>
    )
  }

  // Comportamiento por defecto: se renderiza como sección independiente
  return (
    <section
      id="contact"
      className={`snap-start ${sectionPadding} flex flex-col items-center text-center gap-6 min-[1100px]:flex-row min-[1100px]:items-start min-[1100px]:text-left min-[1100px]:gap-16`}
    >
      {content}
    </section>
  )
}

export default memo(Contact)
