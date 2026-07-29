---
name: hotel-report
description: Analyze hotel reviews and generate a report. Use when user mentions hotel analysis, a hotel name, or a Booking.com URL.
---

Generiraj analizo komentarjev za hotel: $ARGUMENTS

Koraki:
1. Preveri, ali je vnos Booking.com URL ali ime hotela
2. Analiziraj razpoložljive komentarje po oddelkih: sprejem, sobe, hrana, lokacija, čistoča
3. Ustvari poročilo z: skupno oceno, ključnimi prednostmi, ključnimi slabostmi, priporočilom za gosta
4. Output: čist HTML, primeren za predstavitev prodajni ekipi Acente

Opombe:
- Apify krediti so IZČRPANI — ne predlagaj Apify rešitev
- Za vnos vedno uporabi Booking.com URL
- Outscraper API deluje za Booking.com in Google Reviews
- TripAdvisor je nestabilen (pogosto 404/500 za slovenske hotele)
- Free tier Anthropic: 10k tokenov/min — pri 429 napaki počakaj minuto
