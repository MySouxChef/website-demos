/**
 * Demo Template
 *
 * Copy this folder and rename it to your demo slug (kebab-case).
 * The default export is the main demo component rendered at /demos/[slug].
 *
 * Guidelines:
 * - Use CSS Modules (styles.module.css) or Tailwind for styling
 * - Keep the demo self-contained — don't import from other demos
 * - Break into sub-components in the ./components/ folder
 */

import styles from "./styles.module.css";

export default function DemoTemplate() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Demo Template</h1>
      <p className={styles.subtitle}>Replace this with your demo content.</p>
    </div>
  );
}
