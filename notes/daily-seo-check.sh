#!/bin/bash
# Daily SEO Health Check for bestalt.org
# Run: daily at 9:00 AM
# Checks: site uptime, sitemap accessibility, robots.txt, GA4 data, error pages

SITE="https://bestalt.org"
TODAY=$(date '+%Y-%m-%d')
RESULT=""

# 1. Site uptime check
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$SITE/")
if [ "$HTTP_CODE" = "200" ]; then
  RESULT="${RESULT}✅ Site up (HTTP 200)"
else
  RESULT="${RESULT}❌ Site DOWN! HTTP $HTTP_CODE"
fi

# 2. Sitemap check
SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$SITE/sitemap.xml")
if [ "$SITEMAP_CODE" = "200" ]; then
  SITEMAP_COUNT=$(curl -s "$SITE/sitemap.xml" | grep -o '<loc>' | wc -l)
  RESULT="${RESULT} | ✅ Sitemap OK ($SITEMAP_COUNT URLs)"
else
  RESULT="${RESULT} | ❌ Sitemap error (HTTP $SITEMAP_CODE)"
fi

# 3. Robots.txt check
ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$SITE/robots.txt")
if [ "$ROBOTS_CODE" = "200" ]; then
  RESULT="${RESULT} | ✅ robots.txt OK"
else
  RESULT="${RESULT} | ❌ robots.txt error (HTTP $ROBOTS_CODE)"
fi

# 4. Check for broken pages (sample: random tool page)
SAMPLE_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$SITE/notion-alternatives")
if [ "$SAMPLE_CODE" = "200" ]; then
  RESULT="${RESULT} | ✅ Sample page OK (notion-alternatives)"
else
  RESULT="${RESULT} | ❌ Sample page broken (HTTP $SAMPLE_CODE)"
fi

# 5. Check for Naver bot block (common issue)
if curl -s --max-time 5 -A "NaverBot" "$SITE/" | grep -qi "blocked"; then
  RESULT="${RESULT} | ⚠️ Naver bot may be blocked"
fi

echo "[$TODAY] SEO Health Check"
echo "$RESULT"
echo "---"
echo "Time: $(date '+%Y-%m-%d %H:%M:%S')"
