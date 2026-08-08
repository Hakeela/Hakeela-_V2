-- ============================================================
-- Hakeela HakPortal — sample content seed (optional)
-- Run AFTER schema.sql, in the Supabase SQL Editor, to give the catalog
-- some published courses to show. Safe to edit/remove.
-- ============================================================

insert into public.courses (title, slug, description, category, price, thumbnail_url, status) values
  ('Data Analysis',        'data-analysis',  'Unlock the power of data to make smart, informed decisions.', 'Courses', 5000, null, 'published'),
  ('Product Design',       'product-design', 'Create user-centered products that solve real problems.',     'Courses', 5000, null, 'published'),
  ('Web Development',      'web-development', 'Go from your first line of code to deploying real apps.',      'Courses', 5000, null, 'published'),
  ('Introduction to Computer', 'intro-computer', 'Begin your tech career by understanding computer essentials.', 'Special Needs & Tech', 0, null, 'published'),
  ('Excel for Beginners',  'excel',          'Welcome to a world of charts & tables.',                       'Special Needs & Tech', 0, null, 'published'),
  ('Everyone a Changemaker','changemaker',   'Lead change in your community.',                               'Leadership', 5000, null, 'published')
on conflict (slug) do nothing;

-- Example modules + lessons for Data Analysis
with c as (select id from public.courses where slug = 'data-analysis' limit 1),
     m as (
       insert into public.modules (course_id, title, position)
       select c.id, 'Module 1: Introduction to Data Science', 1 from c
       returning id
     )
insert into public.lessons (module_id, title, duration, position)
select m.id, x.title, x.duration, x.position
from m, (values
  ('What is Data Science?', '25 min', 1),
  ('Data Science Tools Overview', '30 min', 2),
  ('Setting Up Your Environment', '45 min', 3)
) as x(title, duration, position);
