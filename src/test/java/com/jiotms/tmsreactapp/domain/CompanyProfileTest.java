package com.jiotms.tmsreactapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jiotms.tmsreactapp.web.rest.TestUtil;

public class CompanyProfileTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompanyProfile.class);
        CompanyProfile companyProfile1 = new CompanyProfile();
        companyProfile1.setId(1L);
        CompanyProfile companyProfile2 = new CompanyProfile();
        companyProfile2.setId(companyProfile1.getId());
        assertThat(companyProfile1).isEqualTo(companyProfile2);
        companyProfile2.setId(2L);
        assertThat(companyProfile1).isNotEqualTo(companyProfile2);
        companyProfile1.setId(null);
        assertThat(companyProfile1).isNotEqualTo(companyProfile2);
    }
}
