# Workspace Rules for Shopify Theme Development

## Shopify Liquid & OS 2.0 Best Practices
1. **JSON Templates & Modular Sections**: Prefer standard JSON templates in `templates/` pointing to modular, configurable `sections/`.
2. **Performance & SEO**:
   - Use Shopify's native `image_url` filter with explicit dimensions and `loading="lazy"` for images below the fold.
   - Include structured JSON-LD microdata for products and organization.
   - Avoid blocking external JavaScript scripts; use `defer="defer"`.
3. **Automated Synchronization Workflow**:
   - After editing files locally, verify syntax and run `git add .`, `git commit`, and `git push origin main` to deploy automatically to Shopify.
4. **Clean Code & Safety**:
   - Always validate Liquid tags and schema JSON formatting before committing.
   - Preserve existing Liquid tags and snippet parameters.
