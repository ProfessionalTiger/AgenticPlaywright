Act as a Senior Test Automation Engineer. I want to add Allure Reporting to my existing Playwright TypeScript/JavaScript framework so that I can generate clean, interactive HTML reports suitable for management.

Please guide me step-by-step and generate all necessary code and configuration updates based on the following requirements:

1. Dependencies & Installation:
   - Provide the exact terminal commands to install the necessary packages (e.g., `allure-playwright` and `allure-commandline` as dev dependencies).

2. Playwright Configuration (`playwright.config.ts` or `playwright.config.js`):
   - Update the `reporter` section in my config to include the 'allure-playwright' reporter.
   - Show how to configure output directory options, detail levels, and automatic screenshot/video/trace attachment capturing on test failure.

3. npm Scripts (`package.json`):
   - Add scripts to clean previous results, run tests, generate the standalone Allure HTML report, and open the interactive report locally.

4. Test Enhancement Patterns:
   - Provide concise examples showing how to enrich test cases using Allure API annotations in my Playwright tests:
     - Epics, Features, and Stories (`allure.epic`, `allure.feature`, `allure.story`)
     - Severity levels (`allure.severity`)
     - Adding step logs (`test.step` or `allure.step`)
     - Custom attachments (e.g., logs or environment metadata)

5. Email-Ready Management Sharing Strategy:
   - Explain how to export or serve the final Allure report folder (`allure-report`) as a static HTML artifact or combine it using `allure-combine` so management can open it directly without needing node/CLI installed.

Provide clean, production-ready code blocks and brief explanations for each step.