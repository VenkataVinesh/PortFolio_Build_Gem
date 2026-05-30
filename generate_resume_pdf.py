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
        story.append(Paragraph("AI/ML Engineer | Software Developer | RL & Intelligent Systems Enthusiast", style_title))
        
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
            "<b>Coursework:</b> Design & Analysis of Algorithms, Probability & Statistics, "
            "Optimization Techniques, Machine Learning, Deep Learning, Reinforcement Learning, Financial Mathematics, Data Structures"
        )
        story.append(Paragraph(coursework_text, style_bullet))
        story.append(Spacer(1, 4))

        # ------------------ TECHNICAL SKILLS SECTION ------------------
        add_section_header("TECHNICAL SKILLS")
        
        skills_list = [
            ("Programming Languages", "Python (Primary), JavaScript, SQL, C++ (DSA & Systems fundamentals)"),
            ("AI / Machine Learning", "PyTorch, TensorFlow, Scikit-learn, Reinforcement Learning, LSTM/GRU, Time Series Forecasting"),
            ("Software Engineering", "React, FastAPI, Docker, REST APIs, Git, Data Structures, Design & Analysis of Algorithms"),
            ("Mathematics & Analytics", "Probability Theory, Statistics, Optimization Techniques, Financial Mathematics, Data Analysis")
        ]
        
        for category, items in skills_list:
            text = f"<b>{category}:</b> {items}"
            story.append(Paragraph(text, style_skills))
        story.append(Spacer(1, 4))

        # ------------------ PROJECTS SECTION ------------------
        add_section_header("TECHNICAL PROJECTS")

        # Project 1: Price Prediction
        p1_data = [
            [Paragraph("Asset Price Prediction Platform", style_item_title), Paragraph("Python, Scikit-learn, Pandas, FastAPI, Docker", style_item_meta)],
        ]
        p1_table = Table(p1_data, colWidths=[4.7 * inch, 3.0 * inch])
        p1_table.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(p1_table)
        
        story.append(Paragraph(
            "• <b>Problem:</b> Aggregating and clean-scaling historical market datasets to run predictive machine learning regression models without system latency bottlenecks.",
            style_bullet
        ))
        story.append(Paragraph(
            "• <b>Architecture & Dev:</b> Built a predictive model in Python using Scikit-learn (Random Forest and Gradient Boosting Regressors) to map asset indicators. Designed a FastAPI backend to expose prediction endpoints.",
            style_bullet
        ))
        story.append(Paragraph(
            "• <b>Outcome:</b> Achieved 92.4% price-direction prediction accuracy on historical test indicators with API response latencies under 15ms.",
            style_bullet
        ))
        story.append(Spacer(1, 4))

        # Project 2: Weather Time-Series Forecasting
        p2_data = [
            [Paragraph("Weather Time-Series Forecasting Model", style_item_title), Paragraph("Python, PyTorch, NumPy, Matplotlib, Git", style_item_meta)],
        ]
        p2_table = Table(p2_data, colWidths=[4.7 * inch, 3.0 * inch])
        p2_table.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(p2_table)
        
        story.append(Paragraph(
            "• <b>Problem:</b> Capture long-range sequence dependencies on multivariate meteorological sensors for weather forecasts.",
            style_bullet
        ))
        story.append(Paragraph(
            "• <b>Architecture & Dev:</b> Structured a deep learning time-series sequence model in PyTorch. Implemented stacked Long Short-Term Memory (LSTM) layers with customized recurrent cell states to prevent gradient degradation.",
            style_bullet
        ))
        story.append(Paragraph(
            "• <b>Outcome:</b> Reduced Mean Absolute Error (MAE) by 14.8% compared to traditional statistical baseline forecasts (ARIMA/SARIMAX).",
            style_bullet
        ))
        story.append(Spacer(1, 4))

        # Project 3: Veltrix: Algorithmic Trading Dashboard & Backtester
        p3_data = [
            [Paragraph("Veltrix: Algorithmic Trading Dashboard & Backtester", style_item_title), Paragraph("Next.js, TypeScript, Python, FastAPI, Docker, PostgreSQL", style_item_meta)],
        ]
        p3_table = Table(p3_data, colWidths=[4.7 * inch, 3.0 * inch])
        p3_table.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(p3_table)
        
        story.append(Paragraph(
            "• <b>Problem:</b> Aggregating historical stock price series and computing asset allocations using Markowitz/Sharpe optimization solvers without introducing interface rendering lag.",
            style_bullet
        ))
        story.append(Paragraph(
            "• <b>Architecture & Dev:</b> Programmed a Next.js dashboard using Recharts to plot price history and expected portfolio variance. Integrated a FastAPI (Python) backend using SciPy solvers to compute optimal portfolio weights.",
            style_bullet
        ))
        story.append(Paragraph(
            "• <b>Outcome:</b> Containerized and deployed the full-stack system using Docker, providing responsive visualization of strategy backtests and mathematical frontiers.",
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
            "• Coordinated operational setup and venue logistics for a flagship university event hosting 10+ speakers and 500+ attendees.",
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
            "• Managed logistical support, venue allocations, and advertising for math modeling competitions, attracting over 300+ students.",
            style_bullet
        ))
        story.append(Spacer(1, 3))

        # Achievement: Chess
        chess_data = [
            [Paragraph("Competitive Chess & Strategic Problem Solving", style_item_title), Paragraph("Bangkok Open | Teplice Open | 2024", style_item_period)],
        ]
        chess_table = Table(chess_data, colWidths=[5.5 * inch, 2.2 * inch])
        chess_table.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(chess_table)
        story.append(Paragraph(
            "• Active chess player with strong interest in analytical thinking, calculation depth, game strategy, and rapid decision-making systems under strict time constraints.",
            style_bullet
        ))

        # Build the PDF
        doc.build(story)
        print(f"Successfully generated PDF: {path}")

if __name__ == "__main__":
    # Save in User Downloads folder and in React public assets folder
    user_home = os.path.expanduser('~')
    downloads_path = os.path.join(user_home, 'Downloads', 'Venkata_Vinesh_Resume_2026.pdf')
    react_public_path = os.path.join(os.getcwd(), 'public', 'resume.pdf')
    
    generate_pdf([downloads_path, react_public_path])
