import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def generate_pdf(output_paths):
    # Establish document margins (Letter size: 8.5 x 11 inches)
    # Tight margins (0.4 inch) to fit rich content in a single-page format
    left_margin = 0.4 * inch
    right_margin = 0.4 * inch
    top_margin = 0.4 * inch
    bottom_margin = 0.4 * inch

    for path in output_paths:
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(path), exist_ok=True)
        
        doc = SimpleDocTemplate(
            path,
            pagesize=letter,
            leftMargin=left_margin,
            rightMargin=right_margin,
            topMargin=top_margin,
            bottomMargin=bottom_margin
        )

        styles = getSampleStyleSheet()
        story = []

        # Color definition
        c_primary = colors.HexColor('#0f172a')   # Slate 900
        c_secondary = colors.HexColor('#0284c7') # Sky 600
        c_text = colors.HexColor('#334155')      # Slate 700
        c_light_gray = colors.HexColor('#e2e8f0')# Slate 200

        # Styles definition
        style_name = ParagraphStyle(
            'Name',
            fontName='Helvetica-Bold',
            fontSize=18,
            leading=20,
            textColor=c_primary,
            alignment=1 # Center
        )

        style_title = ParagraphStyle(
            'Title',
            fontName='Helvetica-Oblique',
            fontSize=10,
            leading=12,
            textColor=c_secondary,
            alignment=1, # Center
            spaceAfter=4
        )

        style_contact = ParagraphStyle(
            'Contact',
            fontName='Helvetica',
            fontSize=8,
            leading=10,
            textColor=c_text,
            alignment=1, # Center
            spaceAfter=6
        )

        style_sec_head = ParagraphStyle(
            'SectionHead',
            fontName='Helvetica-Bold',
            fontSize=11,
            leading=13,
            textColor=c_primary,
            spaceBefore=6,
            spaceAfter=2
        )

        style_item_title = ParagraphStyle(
            'ItemTitle',
            fontName='Helvetica-Bold',
            fontSize=9.5,
            leading=11.5,
            textColor=c_primary
        )

        style_item_meta = ParagraphStyle(
            'ItemMeta',
            fontName='Helvetica-BoldOblique',
            fontSize=9,
            leading=11,
            textColor=c_secondary,
            alignment=2 # Right
        )

        style_item_sub = ParagraphStyle(
            'ItemSub',
            fontName='Helvetica-Oblique',
            fontSize=9,
            leading=11,
            textColor=c_text
        )

        style_item_period = ParagraphStyle(
            'ItemPeriod',
            fontName='Helvetica',
            fontSize=8.5,
            leading=10.5,
            textColor=c_text,
            alignment=2 # Right
        )

        style_bullet = ParagraphStyle(
            'Bullet',
            fontName='Helvetica',
            fontSize=8.5,
            leading=10.5,
            textColor=c_text,
            leftIndent=12,
            firstLineIndent=-8,
            spaceAfter=2
        )

        style_skills = ParagraphStyle(
            'Skills',
            fontName='Helvetica',
            fontSize=8.5,
            leading=11,
            textColor=c_text,
            spaceAfter=2
        )

        # ------------------ HEADER SECTION ------------------
        story.append(Paragraph("A Venkata Vinesh Kumar Reddy", style_name))
        story.append(Paragraph("AI/ML Engineer | Software Developer | Reinforcement Learning & Quantitative Systems Enthusiast", style_title))
        
        contact_info = (
            "Email: <a href='mailto:venkatvinesh46@gmail.com'>venkatvinesh46@gmail.com</a> | "
            "Phone: +91 63641 44883 | "
            "GitHub: <a href='https://github.com/VenkataVinesh'>VenkataVinesh</a> | "
            "LinkedIn: <a href='https://www.linkedin.com/in/venkat-vinesh'>venkat-vinesh</a> | "
            "Portfolio: <a href='https://venkatavinesh.github.io/PortFolio_Build_Gem/'>Portfolio</a>"
        )
        story.append(Paragraph(contact_info, style_contact))

        def add_section_header(title):
            story.append(Paragraph(title, style_sec_head))
            story.append(HRFlowable(width="100%", thickness=0.75, color=c_light_gray, spaceBefore=1, spaceAfter=4))

        # ------------------ EDUCATION SECTION ------------------
        add_section_header("EDUCATION")
        
        edu_data = [
            [Paragraph("Mahindra University, Hyderabad", style_item_title), Paragraph("Expected: May 2027", style_item_period)],
            [Paragraph("B.Tech in Computer Science & Engineering | CGPA: 7.96 / 10.00", style_item_sub), Paragraph("Hyderabad, India", style_item_period)]
        ]
        edu_table = Table(edu_data, colWidths=[5.5 * inch, 2.2 * inch])
        edu_table.setStyle(TableStyle([
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(edu_table)
        story.append(Spacer(1, 2))
        
        coursework_text = (
            "<b>Strong Coursework:</b> Design & Analysis of Algorithms, Probability & Statistics, "
            "Optimization Techniques, Machine Learning, Deep Learning, Reinforcement Learning, Financial Mathematics, Data Structures"
        )
        story.append(Paragraph(coursework_text, style_bullet))
        story.append(Spacer(1, 4))

        # ------------------ TECHNICAL SKILLS SECTION ------------------
        add_section_header("TECHNICAL SKILLS")
        
        skills_list = [
            ("Languages", "C++, Python, JavaScript (ES6+), HTML5, CSS3, SQL"),
            ("AI / Machine Learning", "PyTorch, TensorFlow, Reinforcement Learning (PPO, DQN), Transformers, LSTMs, Weights & Biases (W&B)"),
            ("Software Engineering", "Data Structures, Design & Analysis of Algorithms, OOP, Linux, Git Version Control"),
            ("Mathematics & Analytics", "Stochastic Calculus (SABR, Heston Volatility), Monte Carlo Simulations, Black-Litterman Optimization, Finite Difference pricing"),
            ("Tools & Frameworks", "FastAPI, React, Next.js, Tailwind CSS, Docker, WebSockets, Chart.js")
        ]
        
        for category, items in skills_list:
            text = f"<b>{category}:</b> {items}"
            story.append(Paragraph(text, style_skills))
        story.append(Spacer(1, 4))

        # ------------------ PROJECTS SECTION ------------------
        add_section_header("TECHNICAL PROJECTS")

        # Project 1: Computational Finance
        p1_data = [
            [Paragraph("Computational Finance & Exotic Derivatives Solver", style_item_title), Paragraph("C++, Python, NumPy, SciPy, OpenMP", style_item_meta)],
        ]
        p1_table = Table(p1_data, colWidths=[4.7 * inch, 3.0 * inch])
        p1_table.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(p1_table)
        
        story.append(Paragraph(
            "• <b>Problem:</b> Inefficiencies in pricing path-dependent exotic barrier derivatives under stochastic volatility using Python interpreters.",
            style_bullet
        ))
        story.append(Paragraph(
            "• <b>Architecture & Dev:</b> Engineered a multi-threaded solver in C++ implementing the Crank-Nicolson Finite Difference Method and Monte Carlo path generators. Calibrated local-stochastic volatility parameters under Heston and SABR dynamics.",
            style_bullet
        ))
        story.append(Paragraph(
            "• <b>Outcome:</b> Converged boundary value path equations in &lt; 1.2ms, achieving an 8.4x pricing latency speedup over Python implementations with a 99.7% confidence interval.",
            style_bullet
        ))
        story.append(Spacer(1, 4))

        # Project 2: Weather Time-Series Forecasting
        p2_data = [
            [Paragraph("Multivariate Time-Series & Deep Sequence Predictor", style_item_title), Paragraph("PyTorch, Python, Pandas, Weights & Biases", style_item_meta)],
        ]
        p2_table = Table(p2_data, colWidths=[4.7 * inch, 3.0 * inch])
        p2_table.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(p2_table)
        
        story.append(Paragraph(
            "• <b>Problem:</b> Capturing complex, non-linear atmospheric dependencies in multivariate weather forecasting datasets.",
            style_bullet
        ))
        story.append(Paragraph(
            "• <b>Architecture & Dev:</b> Built a custom sequence modeling pipeline in PyTorch, configuring custom multi-head Attention Transformer encoders and stacked Recurrent LSTM/GRU layers. Leveraged Weights & Biases (W&B) for loss optimization tracking.",
            style_bullet
        ))
        story.append(Paragraph(
            "• <b>Outcome:</b> Reduced Mean Absolute Error (MAE) by 14.8% on global datasets compared to traditional statistical baselines (ARIMA/SARIMAX).",
            style_bullet
        ))
        story.append(Spacer(1, 4))

        # Project 3: Veltrix Terminal
        p3_data = [
            [Paragraph("Veltrix Institutional AI Financial Terminal", style_item_title), Paragraph("React, JavaScript, Tailwind, Canvas, FastAPI", style_item_meta)],
        ]
        p3_table = Table(p3_data, colWidths=[4.7 * inch, 3.0 * inch])
        p3_table.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(p3_table)
        
        story.append(Paragraph(
            "• <b>Problem:</b> Sluggish telemetry updates in multi-widget financial UI dashboards rendering heavy charting and risk matrices.",
            style_bullet
        ))
        story.append(Paragraph(
            "• <b>Architecture & Dev:</b> Designed a single-page React analytics console. Implemented custom HTML5 Canvas drawing engines to render real-time asset covariance grids, volatility smiles, and Value-at-Risk (VaR/CVaR) risk indices.",
            style_bullet
        ))
        story.append(Paragraph(
            "• <b>Outcome:</b> Successfully modularized 12 interactive analytics grids in a single viewport, maintaining stable &lt; 45ms UI redraw rendering latencies.",
            style_bullet
        ))
        story.append(Spacer(1, 4))

        # ------------------ LEADERSHIP & EXPERIENCE SECTION ------------------
        add_section_header("LEADERSHIP & EXTRACURRICULARS")

        # Leadership 1: TEDx
        l1_data = [
            [Paragraph("Operations Lead", style_item_title), Paragraph("TEDx Mahindra University | 2024", style_item_period)],
        ]
        l1_table = Table(l1_data, colWidths=[5.5 * inch, 2.2 * inch])
        l1_table.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(l1_table)
        story.append(Paragraph(
            "• Spearheaded operational pipelines and logistics for a 500+ audience event. Coordinated cross-functional teams to manage timeline execution.",
            style_bullet
        ))
        story.append(Spacer(1, 3))

        # Leadership 2: Math Club
        l2_data = [
            [Paragraph("Logistics Head", style_item_title), Paragraph("Mahindra University Math Club | 2023 - 2024", style_item_period)],
        ]
        l2_table = Table(l2_data, colWidths=[5.5 * inch, 2.2 * inch])
        l2_table.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(l2_table)
        story.append(Paragraph(
            "• Engineered logistics, sponsorships, and scheduling for university-wide math modeling competitions and algorithmic puzzle contests, engaging over 300+ students.",
            style_bullet
        ))
        story.append(Spacer(1, 3))

        # Achievement: Chess
        chess_data = [
            [Paragraph("International Chess Competitor", style_item_title), Paragraph("Bangkok Open | Teplice Open | 2024", style_item_period)],
        ]
        chess_table = Table(chess_data, colWidths=[5.5 * inch, 2.2 * inch])
        chess_table.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(chess_table)
        story.append(Paragraph(
            "• Competed at FIDE-rated international opens, displaying advanced strategic calculation, game theory, and rapid decision-making under intense competitive environments.",
            style_bullet
        ))

        # Build the PDF
        doc.build(story)
        print(f"Successfully generated PDF: {path}")

if __name__ == "__main__":
    # Save in User Downloads folder and in React public assets folder
    user_home = os.path.expanduser('~')
    downloads_path = os.path.join(user_home, 'Downloads', 'Venkata_Vinesh_Resume.pdf')
    react_public_path = os.path.join(os.getcwd(), 'public', 'resume.pdf')
    
    generate_pdf([downloads_path, react_public_path])
