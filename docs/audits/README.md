# Audit Reports And Triage

Audit reports are stored in `reports/`. Triage documents are stored in
`triage/` and either match a report filename prefix or list the report files
they cover.

## Reports

- `reports/zellic-2026-06-30-report.pdf`: professional manual audit report
  from Zellic.
- `reports/audit-agent-2026-06-23-report-7.pdf`: Audit Agent report. This is not
  redundant with the markdown reports; the Cantina scan references one related
  item, but the triage covers multiple findings from this PDF.
- `reports/octane-2026-04-13-analysis-1-fix-octane-audit.md`: Octane automated
  analysis for the `fix-octane-audit` context.
- `reports/octane-2026-04-13-analysis-2-main-arb-grant.md`: Octane automated
  analysis for the `main CI/CD - One Month Arb Grant` context.
- `reports/cantina-2026-06-29-scan-1.md`: Cantina AI Scan #1 findings.

## Triage

- `triage/audit-agent-octane-2026-04-13-2026-06-23-triage.md`: triage covering the Audit
  Agent report and both Octane 2026-04-13 markdown reports.
- `triage/cantina-2026-06-29-scan-1-triage.md`: triage for Cantina Scan #1.
